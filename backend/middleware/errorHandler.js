// middleware/errorHandler.js
// Global error handling middleware

/**
 * Catches all unhandled errors and returns consistent JSON error responses
 */
function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err.message);

  // Anthropic API errors
  if (err.message?.includes('API key') || err.status === 401) {
    return res.status(500).json({
      error: 'AI service authentication failed. Check your ANTHROPIC_API_KEY.',
    });
  }

  // JSON parse errors from AI response
  if (err instanceof SyntaxError) {
    return res.status(500).json({
      error: 'Failed to parse AI response. Please try again.',
    });
  }

  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Duplicate entry' });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection failed' });
  }

  // Generic error
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected error occurred',
  });
}

/**
 * Wraps async route handlers to automatically catch promise rejections
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { errorHandler, asyncHandler };
