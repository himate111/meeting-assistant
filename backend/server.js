// server.js
// Main Express application entry point

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // ← ADD THIS
const meetingRoutes = require('./routes/meetingRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────
// ← REPLACE your cors line with this:
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://meeting-assistant-oqqa.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Routes ─────────────────────────────────────────
app.use('/api/meetings', meetingRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── Serve React Frontend ───────────────────────────  ← ADD THIS BLOCK
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// 404 handler  ← KEEP THIS (only hits in development now)
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

// ── Start Server ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/meetings`);
});