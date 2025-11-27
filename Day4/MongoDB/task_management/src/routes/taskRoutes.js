// src/routes/taskRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/rbac');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Public routes (none for tasks, all require authentication)

// READ and CREATE (Accessible to Admin and standard User)
router.route('/')
    .get(protect, authorize(['admin', 'user']), getTasks)
    .post(protect, authorize(['admin', 'user']), createTask);

// UPDATE and DELETE (Accessible to Admin ONLY)
router.route('/:id')
    .put(protect, authorize('admin'), updateTask) 
    .delete(protect, authorize('admin'), deleteTask);

module.exports = router;