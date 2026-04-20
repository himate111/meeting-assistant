// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/meetings - Upload and process a transcript
router.post('/', asyncHandler(meetingController.createMeeting));

// GET /api/meetings - List all meetings
router.get('/', asyncHandler(meetingController.getAllMeetings));

// GET /api/meetings/:id - Get meeting details with tasks
router.get('/:id', asyncHandler(meetingController.getMeetingById));

module.exports = router;
