import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const TrackCard = ({ track, showArtwork = true, showDuration = true }) => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handlePlay = () => {
    playTrack(track);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="track-card" onClick={handlePlay}>
      {showArtwork && (
        <img 
          src={track.album?.cover_small || track.artist?.picture_small || '/placeholder-album.png'} 
          alt={track.title}
          onError={(e) => {
            e.target.src = '/placeholder-album.png';
          }}
        />
      )}
      
      <div className="track-info">
        <div className="track-title">
          {isCurrentTrack && (
            <span style={{ color: '#1db954', marginRight: '8px' }}>
              {isPlaying ? '🔊' : '⏸️'}
            </span>
          )}
          {track.title}
        </div>
        <div className="track-artist">
          {track.artist?.name}
        </div>
      </div>

      {showDuration && (
        <div className="track-duration">
          {formatDuration(track.duration)}
        </div>
      )}

      <button 
        className="player-button"
        style={{ 
          marginLeft: '10px',
          opacity: isCurrentTrack ? 1 : 0.7
        }}
        onClick={(e) => {
          e.stopPropagation();
          handlePlay();
        }}
      >
        {isCurrentTrack && isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
  );
};

export default TrackCard;