// src/controllers/taskController.js
const Task = require('../models/Task');

// CREATE Task (Allowed: Admin, User)
const createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
        title,
        description,
        user: req.user._id, // Set the creator
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

// READ All Tasks (Allowed: Admin, User)
const getTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
};

// UPDATE Task (Allowed: Admin ONLY)
const updateTask = async (req, res) => {
    // Note: The RBAC middleware ensures only 'admin' reaches this point.
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// DELETE Task (Allowed: Admin ONLY)
const deleteTask = async (req, res) => {
    // Note: The RBAC middleware ensures only 'admin' reaches this point.
    const task = await Task.findByIdAndDelete(req.params.id);

    if (task) {
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };