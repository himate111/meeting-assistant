// src/components/SummaryCard.jsx
// Displays AI-generated summary and key discussion points

export default function SummaryCard({ summary, keyPoints }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Summary */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <span className="card-icon">📝</span> AI Summary
          </span>
        </div>
        <div className="summary-text">{summary}</div>
      </div>

      {/* Key Points */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <span className="card-icon">💡</span> Key Discussion Points
          </span>
          <span className="badge badge-count">{keyPoints?.length || 0}</span>
        </div>
        <div>
          {keyPoints && keyPoints.length > 0 ? (
            keyPoints.map((point, i) => (
              <div key={i} className="key-point">{point}</div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No key points extracted
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
