import React from 'react';
import TrackCard from '../components/TrackCard';
import { usePlayer } from '../context/PlayerContext';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    queue,
    currentIndex,
    playQueue,
    clearQueue,
    formatTime,
    currentTime,
    duration,
    volume,
    setVolume
  } = usePlayer();

  const handlePlayFromQueue = (index) => {
    if (queue[index]) {
      playQueue(queue, index);
    }
  };

  const handleClearQueue = () => {
    if (window.confirm('Are you sure you want to clear the queue?')) {
      clearQueue();
    }
  };

  const volumePercentage = Math.round(volume * 100);

  return (
    <div className="page">
      <div className="page-title">Now Playing</div>

      {/* Current Track Display */}
      {currentTrack ? (
        <div className="section">
          <div style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a90e2 100%)',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}>
            <img 
              src={currentTrack.album?.cover_big || currentTrack.album?.cover_medium || '/placeholder-album.png'} 
              alt={currentTrack.title}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '12px',
                objectFit: 'cover',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onError={(e) => {
                e.target.src = '/placeholder-album.png';
              }}
            />
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#b3b3b3', marginBottom: '8px', textTransform: 'uppercase' }}>
                {isPlaying ? 'Now Playing' : 'Paused'}
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.1' }}>
                {currentTrack.title}
              </h1>
              <h2 style={{ fontSize: '24px', color: '#b3b3b3', marginBottom: '20px' }}>
                {currentTrack.artist?.name}
              </h2>
              <div style={{ fontSize: '16px', color: '#ffffff', marginBottom: '20px' }}>
                {currentTrack.album?.title}
              </div>
              
              {/* Progress Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', color: '#b3b3b3' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <span style={{ fontSize: '14px', color: '#b3b3b3' }}>•</span>
                <span style={{ fontSize: '14px', color: '#b3b3b3' }}>
                  Volume: {volumePercentage}%
                </span>
              </div>

              {/* Track Stats */}
              <div style={{ display: 'flex', gap: '20px' }}>
                {currentTrack.rank && (
                  <div style={{ fontSize: '14px', color: '#1db954' }}>
                    Rank: #{currentTrack.rank}
                  </div>
                )}
                {currentTrack.bpm && (
                  <div style={{ fontSize: '14px', color: '#b3b3b3' }}>
                    {currentTrack.bpm} BPM
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="section">
          <div style={{
            backgroundColor: '#181818',
            borderRadius: '12px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎵</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>No track selected</h2>
            <p style={{ color: '#b3b3b3', fontSize: '16px' }}>
              Go to Home or Search to find music to play
            </p>
          </div>
        </div>
      )}

      {/* Queue Section */}
      {queue.length > 0 && (
        <div className="section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <h2 className="section-title">
              Queue ({queue.length} tracks)
            </h2>
            <button 
              className="btn btn-secondary"
              onClick={handleClearQueue}
            >
              Clear Queue
            </button>
          </div>

          <div style={{ 
            backgroundColor: '#181818', 
            borderRadius: '8px', 
            padding: '20px',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            {queue.map((track, index) => (
              <div 
                key={`${track.id}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: index === currentIndex ? '#282828' : 'transparent',
                  border: index === currentIndex ? '1px solid #1db954' : '1px solid transparent',
                  marginBottom: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => handlePlayFromQueue(index)}
              >
                <div style={{ 
                  width: '20px', 
                  textAlign: 'center',
                  fontSize: '14px',
                  color: index === currentIndex ? '#1db954' : '#b3b3b3'
                }}>
                  {index === currentIndex ? (isPlaying ? '🔊' : '⏸️') : index + 1}
                </div>
                
                <img 
                  src={track.album?.cover_small || '/placeholder-album.png'} 
                  alt={track.title}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = '/placeholder-album.png';
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: index === currentIndex ? '#ffffff' : '#ffffff',
                    marginBottom: '4px'
                  }}>
                    {track.title}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#b3b3b3' 
                  }}>
                    {track.artist?.name}
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#b3b3b3',
                  minWidth: '40px',
                  textAlign: 'right'
                }}>
                  {formatTime(track.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Player Tips */}
      <div className="section">
        <h2 className="section-title">Player Tips</h2>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>⌨️ Keyboard Shortcuts</h3>
            <ul style={{ color: '#b3b3b3', fontSize: '14px', lineHeight: '1.6' }}>
              <li>Spacebar: Play/Pause</li>
              <li>←/→: Seek backward/forward</li>
              <li>↑/↓: Volume up/down</li>
            </ul>
          </div>
          
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>🎵 Features</h3>
            <ul style={{ color: '#b3b3b3', fontSize: '14px', lineHeight: '1.6' }}>
              <li>30-second preview tracks</li>
              <li>Queue management</li>
              <li>Volume control with localStorage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;