// models/meetingModel.js
// Database operations for the meetings table

const db = require('../config/db');

/**
 * Create a new meeting record with AI-processed data
 */
async function createMeeting({ title, transcript, summary, key_points }) {
  const [result] = await db.execute(
    `INSERT INTO meetings (title, transcript, summary, key_points)
     VALUES (?, ?, ?, ?)`,
    [title, transcript, summary, JSON.stringify(key_points)]
  );
  return result.insertId;
}

/**
 * Get all meetings (list view - no transcript to keep payload small)
 */
async function getAllMeetings() {
  const [rows] = await db.execute(
    `SELECT id, title, summary, created_at FROM meetings ORDER BY created_at DESC`
  );
  return rows;
}

/**
 * Get a single meeting with full details
 */
async function getMeetingById(id) {
  const [rows] = await db.execute(
    `SELECT * FROM meetings WHERE id = ?`,
    [id]
  );
  if (rows.length === 0) return null;

  const meeting = rows[0];
  // Parse key_points JSON string back to array
  if (typeof meeting.key_points === 'string') {
    meeting.key_points = JSON.parse(meeting.key_points);
  }
  return meeting;
}

module.exports = { createMeeting, getAllMeetings, getMeetingById };
