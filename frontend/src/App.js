import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AudioPlayer from './components/AudioPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import Player from './pages/Player';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/player" element={<Player />} />
          </Routes>
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <AppContent />
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;