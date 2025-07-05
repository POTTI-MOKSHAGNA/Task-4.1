import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setUsername('demo');
    setPassword('demo');
    setLoading(true);
    setError('');

    const result = await login('demo', 'demo');
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>🎵 Music App</h1>
        
        <div className="demo-credentials">
          <strong>Demo Login:</strong><br />
          Username: demo<br />
          Password: demo
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn"
          disabled={loading}
          style={{ width: '100%', marginBottom: '15px' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={handleDemoLogin}
          disabled={loading}
          style={{ width: '100%' }}
        >
          Quick Demo Login
        </button>

        <div style={{ 
          marginTop: '20px', 
          fontSize: '12px', 
          color: '#b3b3b3',
          textAlign: 'center' 
        }}>
          This is a demo music streaming app powered by Deezer API
        </div>
      </form>
    </div>
  );
};

export default Login;