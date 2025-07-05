import React, { useState } from 'react';
import TrackCard from '../components/TrackCard';
import { useSearch } from '../hooks/useDeezer';
import { usePlayer } from '../context/PlayerContext';

const Search = () => {
  const [searchType, setSearchType] = useState('track');
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    error,
    performSearch 
  } = useSearch('', 500);
  
  const { playQueue } = usePlayer();

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    if (query.trim()) {
      performSearch(query);
    }
  };

  const handlePlayAllResults = () => {
    if (results?.data && results.data.length > 0) {
      playQueue(results.data, 0);
    }
  };

  const renderResults = () => {
    if (!results || !results.data) return null;

    if (results.data.length === 0) {
      return (
        <div style={{ 
          backgroundColor: '#181818', 
          padding: '40px', 
          borderRadius: '8px',
          textAlign: 'center',
          color: '#b3b3b3'
        }}>
          No results found for "{query}". Try a different search term.
        </div>
      );
    }

    if (searchType === 'track') {
      return (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <div style={{ color: '#b3b3b3', fontSize: '14px' }}>
              Found {results.data.length} tracks
            </div>
            <button className="btn" onClick={handlePlayAllResults}>
              ▶️ Play All
            </button>
          </div>
          <div className="search-results">
            {results.data.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track} 
              />
            ))}
          </div>
        </div>
      );
    }

    if (searchType === 'artist') {
      return (
        <div className="grid grid-3">
          {results.data.map((artist) => (
            <div key={artist.id} className="card">
              <img 
                src={artist.picture_medium || '/placeholder-artist.png'} 
                alt={artist.name}
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-artist.png';
                }}
              />
              <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>
                {artist.name}
              </h3>
              <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
                {artist.nb_fan ? `${artist.nb_fan.toLocaleString()} fans` : 'Artist'}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (searchType === 'album') {
      return (
        <div className="grid grid-3">
          {results.data.map((album) => (
            <div key={album.id} className="card">
              <img 
                src={album.cover_medium || '/placeholder-album.png'} 
                alt={album.title}
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-album.png';
                }}
              />
              <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>
                {album.title}
              </h3>
              <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
                {album.artist?.name}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="page">
      <div className="page-title">Search Music</div>

      <div className="search-container">
        {/* Search Input */}
        <div className="search-input">
          <input
            type="text"
            className="input"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Search Type Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <button 
            className={`btn ${searchType === 'track' ? '' : 'btn-secondary'}`}
            onClick={() => handleSearchTypeChange('track')}
          >
            Tracks
          </button>
          <button 
            className={`btn ${searchType === 'artist' ? '' : 'btn-secondary'}`}
            onClick={() => handleSearchTypeChange('artist')}
          >
            Artists
          </button>
          <button 
            className={`btn ${searchType === 'album' ? '' : 'btn-secondary'}`}
            onClick={() => handleSearchTypeChange('album')}
          >
            Albums
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Search Results */}
        {!loading && renderResults()}

        {/* Empty State */}
        {!query && !loading && (
          <div style={{ 
            backgroundColor: '#181818', 
            padding: '60px 40px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ marginBottom: '10px', fontSize: '24px' }}>
              Start searching for music
            </h3>
            <p style={{ color: '#b3b3b3', fontSize: '16px' }}>
              Find your favorite songs, artists, and albums
            </p>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {!query && (
        <div className="section">
          <h2 className="section-title">Popular Searches</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              'Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 
              'Electronic', 'Country', 'R&B'
            ].map((genre) => (
              <button
                key={genre}
                className="btn btn-secondary"
                onClick={() => setQuery(genre)}
                style={{ fontSize: '14px' }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;