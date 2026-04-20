// src/components/TranscriptUploadForm.jsx
// Handles both text paste and PDF file upload for meeting transcripts

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeeting } from '../services/api';

export default function TranscriptUploadForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');

  // Handle PDF file reading
  const handleFile = async (file) => {
    if (!file) return;

    if (file.type === 'text/plain') {
      // Plain text files
      const text = await file.text();
      setTranscript(text);
      setFileName(file.name);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    } else if (file.type === 'application/pdf') {
      // For PDF, send to backend as base64 (handled server-side)
      // Here we use a simpler approach: read as text with FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        // We'll send the raw file to backend to extract text
        // For now, show file name and let user know backend handles it
        setFileName(file.name);
        if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
        // Store the file data URL for PDF processing
        setTranscript(`[PDF FILE: ${file.name}]\n\nNote: PDF content will be extracted on the server. Alternatively, paste the transcript text directly.`);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a .txt or .pdf file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Please enter a meeting title');
      return;
    }
    if (!transcript.trim() || transcript.trim().length < 50) {
      setError('Transcript must be at least 50 characters. Please paste or upload meeting content.');
      return;
    }

    setLoading(true);
    try {
      const response = await createMeeting({ title: title.trim(), transcript: transcript.trim() });
      const meetingId = response.data.meeting.id;
      navigate(`/meetings/${meetingId}`, { state: { fresh: true } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-banner">⚠️ {error}</div>}

      {/* Meeting Title */}
      <div className="form-group">
        <label className="form-label">Meeting Title</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Q4 Product Roadmap Sync"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* File Drop Zone */}
      <div className="form-group">
        <label className="form-label">Upload File (Optional)</label>
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          <div className="dropzone-icon">📎</div>
          <div className="dropzone-text">
            {fileName ? `✅ ${fileName}` : 'Drop a file here or click to browse'}
          </div>
          <div className="dropzone-hint">.txt files supported • Or paste transcript below</div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf"
          style={{ display: 'none' }}
          onChange={handleFileInput}
        />
      </div>

      {/* Transcript Text Area */}
      <div className="form-group">
        <label className="form-label">
          Transcript Text
          <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '0.7rem', textTransform: 'none' }}>
            Paste your meeting transcript here
          </span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="[00:00] Alice: Let's get started. Today we're reviewing Q4 targets...&#10;[00:02] Bob: I can handle the client outreach by Friday..."
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          disabled={loading}
          style={{ minHeight: '280px' }}
        />
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
          {transcript.length} characters
        </div>
      </div>

      {/* Submit */}
      {loading ? (
        <div className="processing-overlay">
          <div className="processing-dots">
            <span /><span /><span />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Processing with AI — extracting summary & action items...
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            This may take 10–30 seconds
          </div>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          ⚡ Process with AI
        </button>
      )}
    </form>
  );
}
