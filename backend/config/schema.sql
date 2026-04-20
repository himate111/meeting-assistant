-- ============================================
-- AI Meeting Assistant - Database Schema
-- Run this script to initialize the database
-- ============================================

CREATE DATABASE IF NOT EXISTS meeting_assistant;
USE meeting_assistant;

-- Meetings table: stores transcript, AI summary, and key points
CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  transcript LONGTEXT NOT NULL,
  summary TEXT,
  key_points JSON,          -- Stored as JSON array of strings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tasks table: action items extracted from each meeting
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meeting_id INT NOT NULL,
  task TEXT NOT NULL,
  owner VARCHAR(255),
  deadline VARCHAR(255),    -- Flexible string since AI may return natural language dates
  status ENUM('pending', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE
);

-- Index for faster task filtering
CREATE INDEX idx_tasks_meeting_id ON tasks(meeting_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_owner ON tasks(owner);
