import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDeezer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (requestFn) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Something went wrong';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const searchMusic = async (query, type = 'track', limit = 25) => {
    return makeRequest(async () => {
      const response = await axios.get('/api/music/search', {
        params: { q: query, type, limit }
      });
      return response.data;
    });
  };

  const getTrack = async (id) => {
    return makeRequest(async () => {
      const response = await axios.get(`/api/music/track/${id}`);
      return response.data;
    });
  };

  const getAlbum = async (id) => {
    return makeRequest(async () => {
      const response = await axios.get(`/api/music/album/${id}`);
      return response.data;
    });
  };

  const getArtist = async (id) => {
    return makeRequest(async () => {
      const response = await axios.get(`/api/music/artist/${id}`);
      return response.data;
    });
  };

  const getChart = async (limit = 50) => {
    return makeRequest(async () => {
      const response = await axios.get('/api/music/chart', {
        params: { limit }
      });
      return response.data;
    });
  };

  const getGenres = async () => {
    return makeRequest(async () => {
      const response = await axios.get('/api/music/genres');
      return response.data;
    });
  };

  const getTracksByGenre = async (genreId, limit = 25) => {
    return makeRequest(async () => {
      const response = await axios.get(`/api/music/genre/${genreId}/tracks`, {
        params: { limit }
      });
      return response.data;
    });
  };

  return {
    loading,
    error,
    searchMusic,
    getTrack,
    getAlbum,
    getArtist,
    getChart,
    getGenres,
    getTracksByGenre
  };
};

// Hook for searching with debouncing
export const useSearch = (initialQuery = '', delay = 500) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const { searchMusic, loading, error } = useDeezer();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults(null);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery) => {
    try {
      const data = await searchMusic(searchQuery);
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
      setResults(null);
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    performSearch
  };
};