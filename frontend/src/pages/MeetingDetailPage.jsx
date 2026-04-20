// src/pages/MeetingDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getMeetingById } from '../services/api';
import SummaryCard from '../components/SummaryCard';
import TaskList from '../components/TaskList';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function MeetingDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const isFresh = location.state?.fresh;

  const [meeting, setMeeting] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');

  useEffect(() => {
    getMeetingById(id)
      .then(res => {
        setMeeting(res.data.meeting);
        setTasks(res.data.tasks);
      })
      .catch(() => setError('Meeting not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <span className="loading-text">Loading meeting details...</span>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div>
        <div className="error-banner">{error || 'Meeting not found'}</div>
        <Link to="/" className="btn btn-secondary">← Back to Dashboard</Link>
      </div>
    );
  }

  // Filter tasks locally
  const filteredTasks = taskFilter === 'all'
    ? tasks
    : tasks.filter(t => t.status === taskFilter);

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div>
      {isFresh && (
        <div className="success-banner">
          ✅ Meeting processed successfully! AI extracted {tasks.length} action items.
        </div>
      )}

      <Link to="/" className="back-link">← Back to Dashboard</Link>

      {/* Header */}
      <div className="page-header">
        <h1>{meeting.title}</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          📅 {formatDate(meeting.created_at)}
        </p>
      </div>

      {/* Summary + Key Points */}
      <SummaryCard
        summary={meeting.summary}
        keyPoints={meeting.key_points}
      />

      {/* Action Items */}
      <div className="card" style={{ marginTop: '16px' }}>
        <div className="card-header">
          <span className="card-title">
            <span className="card-icon">✅</span> Action Items
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="badge badge-pending">{pendingCount} pending</span>
            <span className="badge badge-completed">{completedCount} done</span>
          </div>
        </div>

        {/* Task filter tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              className={`btn btn-sm ${taskFilter === f ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTaskFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && ` (${tasks.length})`}
              {f === 'pending' && ` (${pendingCount})`}
              {f === 'completed' && ` (${completedCount})`}
            </button>
          ))}
        </div>

        <TaskList tasks={filteredTasks} />
      </div>

      {/* Transcript (collapsible) */}
      <div className="card" style={{ marginTop: '16px' }}>
        <div className="card-header">
          <span className="card-title">
            <span className="card-icon">📄</span> Original Transcript
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowTranscript(v => !v)}
          >
            {showTranscript ? 'Hide' : 'Show'}
          </button>
        </div>
        {showTranscript && (
          <div className="transcript-block">{meeting.transcript}</div>
        )}
      </div>
    </div>
  );
}
