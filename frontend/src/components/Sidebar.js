import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div style={{ fontSize: '24px' }}>🎵</div>
        <h1>Music</h1>
      </div>

      <nav>
        <ul className="sidebar-nav">
          <li>
            <Link to="/" className={isActive('/')}>
              <span>🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className={isActive('/search')}>
              <span>🔍</span>
              Search
            </Link>
          </li>
          <li>
            <Link to="/player" className={isActive('/player')}>
              <span>🎵</span>
              Player
            </Link>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#282828', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '15px'
        }}>
          <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '5px' }}>
            Welcome, {user?.name || user?.username}!
          </div>
          <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
            Enjoy your music
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;