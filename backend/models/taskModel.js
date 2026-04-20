// models/taskModel.js
// Database operations for the tasks table

const db = require('../config/db');

/**
 * Bulk insert action items for a meeting
 */
async function createTasks(meetingId, actionItems) {
  if (!actionItems || actionItems.length === 0) return [];

  const values = actionItems.map(item => [
    meetingId,
    item.task,
    item.owner || 'Unassigned',
    item.deadline || 'Not specified',
    'pending',
  ]);

  const [result] = await db.query(
    `INSERT INTO tasks (meeting_id, task, owner, deadline, status) VALUES ?`,
    [values]
  );
  return result;
}

/**
 * Get all tasks for a specific meeting
 */
async function getTasksByMeetingId(meetingId) {
  const [rows] = await db.execute(
    `SELECT * FROM tasks WHERE meeting_id = ? ORDER BY created_at ASC`,
    [meetingId]
  );
  return rows;
}

/**
 * Get all tasks with optional filters
 */
async function getAllTasks({ status, owner } = {}) {
  let query = `SELECT t.*, m.title as meeting_title 
               FROM tasks t 
               JOIN meetings m ON t.meeting_id = m.id 
               WHERE 1=1`;
  const params = [];

  if (status) {
    query += ' AND t.status = ?';
    params.push(status);
  }
  if (owner) {
    query += ' AND t.owner LIKE ?';
    params.push(`%${owner}%`);
  }

  query += ' ORDER BY t.created_at DESC';

  const [rows] = await db.execute(query, params);
  return rows;
}

/**
 * Update a task's status
 */
async function updateTaskStatus(taskId, status) {
  const [result] = await db.execute(
    `UPDATE tasks SET status = ? WHERE id = ?`,
    [status, taskId]
  );
  return result.affectedRows > 0;
}

/**
 * Get distinct owners for filter dropdown
 */
async function getDistinctOwners() {
  const [rows] = await db.execute(
    `SELECT DISTINCT owner FROM tasks WHERE owner != 'Unassigned' ORDER BY owner`
  );
  return rows.map(r => r.owner);
}

module.exports = {
  createTasks,
  getTasksByMeetingId,
  getAllTasks,
  updateTaskStatus,
  getDistinctOwners,
};
