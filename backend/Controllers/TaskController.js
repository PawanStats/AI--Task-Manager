const TaskModel = require("../Models/TaskModel");


const createTask = (req, res) => {
    const data = req.body;
    try {
        const task = TaskModel.addTask(data);
        res.status(201)
            .json({ message: 'Task is created', success: true, task });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};

const fetchAllTasks = (req, res) => {
    try {
        const data = TaskModel.getTasks();
        res.status(200)
            .json({ message: 'All Tasks', success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get all tasks', success: false });
    }
};

const updateTaskById = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const body = req.body;
        const updatedTask = TaskModel.updateTask(id, body);
        if (updatedTask) {
            res.status(200)
                .json({ message: 'Task Updated', success: true, updatedTask });
        } else {
            res.status(404).json({ message: 'Task not found', success: false });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
};

const deleteTaskById = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedTask = TaskModel.deleteTask(id);
        if (deletedTask) {
            res.status(200)
                .json({ message: 'Task is deleted', success: true });
        } else {
            res.status(404).json({ message: 'Task not found', success: false });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};