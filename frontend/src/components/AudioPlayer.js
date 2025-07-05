import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    seekTo,
    playNext,
    playPrevious,
    setVolume,
    formatTime
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const handleVolumeClick = (e) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setVolume(Math.max(0, Math.min(1, percentage)));
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className="audio-player">
      {/* Current Track Info */}
      <div className="player-track-info">
        <img 
          src={currentTrack.album?.cover_small || currentTrack.artist?.picture_small || '/placeholder-album.png'} 
          alt={currentTrack.title}
          onError={(e) => {
            e.target.src = '/placeholder-album.png';
          }}
        />
        <div>
          <div className="track-title" style={{ fontSize: '14px', marginBottom: '4px' }}>
            {currentTrack.title}
          </div>
          <div className="track-artist" style={{ fontSize: '12px' }}>
            {currentTrack.artist?.name}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="player-buttons">
          <button className="player-button" onClick={playPrevious}>
            ⏮️
          </button>
          <button 
            className="player-button play-button" 
            onClick={togglePlayPause}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="player-button" onClick={playNext}>
            ⏭️
          </button>
        </div>

        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div 
            className="progress-bar"
            onClick={handleProgressClick}
          >
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="volume-controls">
        <button className="player-button">
          {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
        </button>
        <div 
          className="volume-slider"
          onClick={handleVolumeClick}
        >
          <div 
            className="progress-fill"
            style={{ width: `${volumePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;