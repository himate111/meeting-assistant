// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/tasks - Get all tasks with optional filters
router.get('/', asyncHandler(taskController.getAllTasks));

// PUT /api/tasks/:id - Update task status
router.put('/:id', asyncHandler(taskController.updateTask));

module.exports = router;
