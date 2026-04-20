// controllers/taskController.js
// Handles HTTP logic for task endpoints

const taskModel = require('../models/taskModel');

/**
 * PUT /api/tasks/:id
 * Update task status (pending/completed)
 */
async function updateTask(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Status must be "pending" or "completed"' });
  }

  const updated = await taskModel.updateTaskStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ message: 'Task updated successfully', id: parseInt(id), status });
}

/**
 * GET /api/tasks
 * Get all tasks with optional filters: ?status=pending&owner=John
 */
async function getAllTasks(req, res) {
  const { status, owner } = req.query;

  // Validate status filter if provided
  if (status && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status filter' });
  }

  const tasks = await taskModel.getAllTasks({ status, owner });
  const owners = await taskModel.getDistinctOwners();

  res.json({ tasks, owners });
}

module.exports = { updateTask, getAllTasks };
