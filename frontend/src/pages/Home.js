import React, { useState, useEffect } from 'react';
import TrackCard from '../components/TrackCard';
import { useDeezer } from '../hooks/useDeezer';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [chartTracks, setChartTracks] = useState([]);
  const [genres, setGenres] = useState([]);
  const { getChart, getGenres, loading, error } = useDeezer();
  const { playQueue } = usePlayer();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load chart tracks
      const chartData = await getChart(20);
      if (chartData?.data) {
        setChartTracks(chartData.data);
      }

      // Load genres
      const genresData = await getGenres();
      if (genresData?.data) {
        setGenres(genresData.data.slice(0, 8)); // Show first 8 genres
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const handlePlayAll = () => {
    if (chartTracks.length > 0) {
      playQueue(chartTracks, 0);
    }
  };

  if (loading && chartTracks.length === 0) {
    return (
      <div className="page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title">
        Good {getGreeting()}! 🎵
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Trending Section */}
      <div className="section">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h2 className="section-title">Trending Now</h2>
          {chartTracks.length > 0 && (
            <button className="btn" onClick={handlePlayAll}>
              ▶️ Play All
            </button>
          )}
        </div>

        {chartTracks.length > 0 ? (
          <div className="search-results">
            {chartTracks.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track} 
              />
            ))}
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#181818', 
            padding: '40px', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#b3b3b3'
          }}>
            Unable to load trending tracks. Please try again later.
          </div>
        )}
      </div>

      {/* Genres Section */}
      {genres.length > 0 && (
        <div className="section">
          <h2 className="section-title">Browse Genres</h2>
          <div className="grid grid-3">
            {genres.map((genre) => (
              <div 
                key={genre.id}
                className="card"
                style={{
                  background: `linear-gradient(135deg, ${getRandomGradient()})`,
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  textAlign: 'center',
                  zIndex: 1
                }}>
                  {genre.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Played Section (Placeholder) */}
      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-2">
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
            <h3 style={{ marginBottom: '10px' }}>Discover Music</h3>
            <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
              Search for your favorite artists, albums, and tracks
            </p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎵</div>
            <h3 style={{ marginBottom: '10px' }}>Music Player</h3>
            <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
              Control your music playback and manage your queue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

// Helper function to get random gradient colors
const getRandomGradient = () => {
  const gradients = [
    '#ff6b6b, #4ecdc4',
    '#45b7d1, #96ceb4',
    '#feca57, #ff9ff3',
    '#48dbfb, #0abde3',
    '#ff9f43, #feca57',
    '#5f27cd, #00d2d3',
    '#a55eea, #26de81',
    '#fd79a8, #6c5ce7'
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default Home;