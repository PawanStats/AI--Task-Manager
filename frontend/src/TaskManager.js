import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash, FaLightbulb, FaMoon, FaSun } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById, GetAISuggestions } from './api';
import { notify } from './utils';
import { useTheme } from './context/ThemeContext';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                setTasks(parsedTasks);
                setCopyTasks(parsedTasks);
            } catch (err) {
                console.error('Error loading tasks from localStorage:', err);
            }
        } else {
            fetchAllTasks();
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleTask = () => {
        if (updateTask && input) {
            const obj = {
                title: input,
                completed: updateTask.completed
            }
            handleUpdateItem(updateTask.id, obj);
        } else if (updateTask === null && input) {
            handleAddTask();
        }
        setInput('')
        setUpdateTask(null)
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.title);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            title: input,
            completed: false
        }
        try {
            const { success, message, task } =
                await CreateTask(obj);
            if (success) {
                const updatedTasks = [...tasks, task];
                setTasks(updatedTasks);
                setCopyTasks(updatedTasks);
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    }

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    }


    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
                setCopyTasks(updatedTasks);
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { id, completed, title } = item;
        const obj = {
            title,
            completed: !completed
        }
        try {
            const { success, message } = await UpdateTaskById(id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error')
        }
    }

    const handleUpdateItem = async (id, obj) => {
        try {
            const { success, message } = await UpdateTaskById(id, obj);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.title.toLowerCase().includes(term));
        setTasks(results);
    }

    const handleGetAISuggestions = async () => {
        try {
            const { success, message, suggestions } = await GetAISuggestions();
            if (success) {
                setAiSuggestions(suggestions);
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to fetch AI suggestions', 'error');
        }
    }

    const handleAddSuggestionAsTask = async (suggestion) => {
        const obj = {
            title: suggestion,
            completed: false
        }
        try {
            const { success, message, task } = await CreateTask(obj);
            if (success) {
                const updatedTasks = [...tasks, task];
                setTasks(updatedTasks);
                setCopyTasks(updatedTasks);
                notify('Task added from suggestion!', 'success');
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to add task', 'error');
        }
    }

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5 task-container p-4 rounded'>
            <button
                className='theme-toggle btn btn-secondary'
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>

            <h1 className='mb-4'>AI Task Manager</h1>
            
            <div className='w-100 mb-3'>
                <div className='input-group'>
                    <input 
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='form-control'
                        placeholder='Add a new Task'
                        onKeyPress={(e) => e.key === 'Enter' && handleTask()}
                    />
                    <button
                        onClick={handleTask}
                        className='btn btn-success'
                    >
                        <FaPlus className='mx-2' />
                    </button>
                </div>
            </div>

            <div className='input-group mb-4 w-100'>
                <span className='input-group-text'>
                    <FaSearch />
                </span>
                <input
                    onChange={handleSearch}
                    className='form-control'
                    type='text'
                    placeholder='Search tasks'
                />
            </div>

            <div className='w-100 mb-3'>
                <button
                    onClick={handleGetAISuggestions}
                    className='btn btn-info w-100'
                >
                    <FaLightbulb className='me-2' />
                    Get AI Task Suggestions
                </button>
            </div>

            {aiSuggestions.length > 0 && (
                <div className='w-100 mb-3 p-3 border rounded ai-suggestions-box'>
                    <h5 className='mb-3'>💡 AI Suggestions (Click to add as task):</h5>
                    <ul className='list-group'>
                        {aiSuggestions.map((suggestion, index) => (
                            <li 
                                key={index} 
                                className='list-group-item d-flex justify-content-between align-items-center'
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleAddSuggestionAsTask(suggestion)}
                            >
                                <span>{suggestion}</span>
                                <button 
                                    className='btn btn-sm btn-success'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddSuggestionAsTask(suggestion);
                                    }}
                                >
                                    <FaPlus />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className='d-flex flex-column w-100'>
                {tasks.length === 0 ? (
                    <div className='text-center p-4'>
                        <p>No tasks yet. Add your first task above! 🚀</p>
                    </div>
                ) : (
                    tasks.map((item) => (
                        <div key={item.id} className='m-2 p-2 border task-item w-100 rounded-3 d-flex justify-content-between align-items-center'>
                            <span className={item.completed ? 'text-decoration-line-through' : ''}>
                                {item.title}
                            </span>

                            <div className='d-flex align-items-center'>
                                <button
                                    onClick={() => handleCheckAndUncheck(item)}
                                    className='btn btn-success btn-sm me-2'
                                    type='button'
                                    title='Mark as complete'>
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => setUpdateTask(item)}
                                    className='btn btn-primary btn-sm me-2'
                                    type='button'
                                    title='Edit task'>
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(item.id)}
                                    className='btn btn-danger btn-sm me-2'
                                    type='button'
                                    title='Delete task'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TaskManager