// src/pages/UploadPage.jsx
import TranscriptUploadForm from '../components/TranscriptUploadForm';

export default function UploadPage() {
  return (
    <div>
      <div className="page-header">
        <h1>New Meeting</h1>
        <p>Paste or upload a transcript — AI will extract the summary, key points, and action items</p>
      </div>

      <div style={{ maxWidth: '760px' }}>
        {/* Tips card */}
        <div className="card" style={{ marginBottom: '24px', borderColor: 'var(--accent-dim)' }}>
          <div className="card-title" style={{ marginBottom: '12px' }}>
            <span className="card-icon">💬</span> Tips for best results
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              'Include speaker names for better owner detection',
              'Timestamps help but are not required',
              'Longer transcripts produce better summaries',
              'Action items are extracted from phrases like "I\'ll do X by Friday"',
            ].map((tip, i) => (
              <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent)' }}>·</span> {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <TranscriptUploadForm />
        </div>
      </div>
    </div>
  );
}
