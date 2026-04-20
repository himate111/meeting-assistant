// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMeetings } from '../services/api';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function DashboardPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMeetings()
      .then(res => setMeetings(res.data.meetings))
      .catch(() => setError('Failed to load meetings'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <span className="loading-text">Loading meetings...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Dashboard</h1>
          <p>All processed meeting transcripts</p>
        </div>
        <Link to="/upload" className="btn btn-primary">
          + New Meeting
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{meetings.length}</div>
          <div className="stat-label">Total Meetings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>
            {meetings.length > 0 ? formatDate(meetings[0].created_at) : '—'}
          </div>
          <div className="stat-label">Last Processed</div>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '40px' }}>
          <div className="empty-state-icon">🎙️</div>
          <h3>No meetings yet</h3>
          <p>Upload your first transcript to get started</p>
          <Link to="/upload" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Upload Transcript
          </Link>
        </div>
      ) : (
        <div className="meetings-grid">
          {meetings.map(meeting => (
            <Link key={meeting.id} to={`/meetings/${meeting.id}`} className="meeting-card">
              <div className="meeting-card-title">{meeting.title}</div>
              {meeting.summary && (
                <div className="meeting-card-summary">{meeting.summary}</div>
              )}
              <div className="meeting-card-meta">
                <span>📅 {formatDate(meeting.created_at)}</span>
                <span style={{ color: 'var(--accent)' }}>View details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
