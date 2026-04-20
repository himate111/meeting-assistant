// src/components/TaskList.jsx
// Reusable task list with checkbox toggling

import { useState } from 'react';
import { updateTaskStatus } from '../services/api';

export default function TaskList({ tasks: initialTasks, showMeetingTitle = false }) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggle = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await updateTaskStatus(task.id, newStatus);
      setTasks(prev =>
        prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t)
      );
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  // Update tasks when prop changes
  if (tasks.length !== initialTasks.length) {
    setTasks(initialTasks);
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✅</div>
        <h3>No tasks found</h3>
        <p>No action items match your current filters</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.status === 'completed'}
            onChange={() => handleToggle(task)}
            title="Mark as complete"
          />
          <div className="task-content">
            <div className="task-text">{task.task}</div>
            <div className="task-meta">
              {task.owner && (
                <span className="task-meta-item">
                  <span>👤</span> {task.owner}
                </span>
              )}
              {task.deadline && task.deadline !== 'Not specified' && (
                <span className="task-meta-item">
                  <span>📅</span> {task.deadline}
                </span>
              )}
              {showMeetingTitle && task.meeting_title && (
                <span className="task-meta-item">
                  <span>📋</span> {task.meeting_title}
                </span>
              )}
              <span className={`badge badge-${task.status}`}>
                {task.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
