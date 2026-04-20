// src/services/api.js
// Centralized Axios API client

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000, // 60s for AI processing
});

// ── Meeting APIs ───────────────────────────────────

/** Upload a transcript and get AI-processed results */
export const createMeeting = (data) => api.post('/meetings', data);

/** Get list of all meetings */
export const getMeetings = () => api.get('/meetings');

/** Get a single meeting with tasks */
export const getMeetingById = (id) => api.get(`/meetings/${id}`);

// ── Task APIs ──────────────────────────────────────

/** Get all tasks with optional filters */
export const getTasks = (params = {}) => api.get('/tasks', { params });

/** Update task status */
export const updateTaskStatus = (id, status) => api.put(`/tasks/${id}`, { status });

export default api;
