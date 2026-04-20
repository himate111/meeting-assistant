// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">⚡</div>
          <span className="navbar-title">MeetingAI</span>
        </Link>
        <div className="navbar-nav">
          <Link to="/" className={`nav-link ${isActive('/') && !isActive('/upload') ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/upload" className={`nav-link ${isActive('/upload') ? 'active' : ''}`}>
            + New Meeting
          </Link>
          <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
            All Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}
