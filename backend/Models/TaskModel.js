const tasks = require('./db');

let nextId = 1;

module.exports = {
    addTask: (taskData) => {
        const newTask = {
            id: nextId++,
            title: taskData.title || taskData.taskName || '',
            completed: taskData.completed || false
        };
        tasks.push(newTask);
        return newTask;
    },
    getTasks: () => tasks,
    updateTask: (id, updatedData) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: updatedData.title || updatedData.taskName || tasks[taskIndex].title,
                completed: updatedData.completed !== undefined ? updatedData.completed : (updatedData.isDone !== undefined ? updatedData.isDone : tasks[taskIndex].completed)
            };
            return tasks[taskIndex];
        }
        return null;
    },
    deleteTask: (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            return tasks.splice(taskIndex, 1)[0];
        }
        return null;
    }
};