// src/pages/TasksPage.jsx
// Global tasks view with status and owner filters

import { useState, useEffect, useCallback } from 'react';
import { getTasks } from '../services/api';
import TaskList from '../components/TaskList';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');

  const fetchTasks = useCallback(() => {
    setLoading(true);
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (ownerFilter) params.owner = ownerFilter;

    getTasks(params)
      .then(res => {
        setTasks(res.data.tasks);
        setOwners(res.data.owners);
      })
      .catch(() => setError('Failed to load tasks'))
      .finally(() => setLoading(false));
  }, [statusFilter, ownerFilter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div>
      <div className="page-header">
        <h1>All Tasks</h1>
        <p>Track and manage action items across all meetings</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>
            {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
          </div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <span className="filters-label">Filters:</span>

        <select
          className="form-select"
          style={{ width: 'auto', padding: '6px 12px' }}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="form-select"
          style={{ width: 'auto', padding: '6px 12px' }}
          value={ownerFilter}
          onChange={e => setOwnerFilter(e.target.value)}
        >
          <option value="">All Owners</option>
          {owners.map(owner => (
            <option key={owner} value={owner}>{owner}</option>
          ))}
        </select>

        {(statusFilter || ownerFilter) && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setStatusFilter(''); setOwnerFilter(''); }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Tasks */}
      <div className="card">
        {loading ? (
          <div className="loading-state" style={{ padding: '40px' }}>
            <div className="spinner" />
            <span className="loading-text">Loading tasks...</span>
          </div>
        ) : (
          <TaskList tasks={tasks} showMeetingTitle={true} />
        )}
      </div>
    </div>
  );
}
