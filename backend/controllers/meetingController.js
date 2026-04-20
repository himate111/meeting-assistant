// controllers/meetingController.js
// Handles HTTP logic for meeting endpoints

const meetingModel = require('../models/meetingModel');
const taskModel = require('../models/taskModel');
const aiService = require('../services/aiService');

/**
 * POST /api/meetings
 * Upload transcript and process with AI
 */
async function createMeeting(req, res) {
  const { title, transcript } = req.body;

  // Validation
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Meeting title is required' });
  }
  if (!transcript || transcript.trim().length < 50) {
    return res.status(400).json({ error: 'Transcript must be at least 50 characters' });
  }

  // Step 1: Process with AI
  const aiResult = await aiService.processTranscript(transcript.trim());

  // Step 2: Save meeting to DB
  const meetingId = await meetingModel.createMeeting({
    title: title.trim(),
    transcript: transcript.trim(),
    summary: aiResult.summary,
    key_points: aiResult.key_points,
  });

  // Step 3: Save action items
  await taskModel.createTasks(meetingId, aiResult.action_items);

  // Step 4: Return full meeting data
  const meeting = await meetingModel.getMeetingById(meetingId);
  const tasks = await taskModel.getTasksByMeetingId(meetingId);

  res.status(201).json({
    message: 'Meeting processed successfully',
    meeting,
    tasks,
  });
}

/**
 * GET /api/meetings
 * List all meetings
 */
async function getAllMeetings(req, res) {
  const meetings = await meetingModel.getAllMeetings();
  res.json({ meetings });
}

/**
 * GET /api/meetings/:id
 * Get meeting details with tasks
 */
async function getMeetingById(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid meeting ID' });
  }

  const meeting = await meetingModel.getMeetingById(id);
  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  const tasks = await taskModel.getTasksByMeetingId(id);

  res.json({ meeting, tasks });
}

module.exports = { createMeeting, getAllMeetings, getMeetingById };
