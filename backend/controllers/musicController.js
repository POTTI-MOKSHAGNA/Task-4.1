const axios = require('axios');
const deezerService = require('../utils/deezerService');

const musicController = {
  // Search for music (tracks, albums, artists)
  async searchMusic(req, res) {
    try {
      const { q, type = 'track', limit = 25 } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const results = await deezerService.search(q, type, limit);
      res.json(results);
    } catch (error) {
      console.error('Search error:', error.message);
      res.status(500).json({ error: 'Failed to search music' });
    }
  },

  // Get track details by ID
  async getTrackById(req, res) {
    try {
      const { id } = req.params;
      const track = await deezerService.getTrack(id);
      res.json(track);
    } catch (error) {
      console.error('Get track error:', error.message);
      res.status(500).json({ error: 'Failed to get track details' });
    }
  },

  // Get album details by ID
  async getAlbumById(req, res) {
    try {
      const { id } = req.params;
      const album = await deezerService.getAlbum(id);
      res.json(album);
    } catch (error) {
      console.error('Get album error:', error.message);
      res.status(500).json({ error: 'Failed to get album details' });
    }
  },

  // Get artist details by ID
  async getArtistById(req, res) {
    try {
      const { id } = req.params;
      const artist = await deezerService.getArtist(id);
      res.json(artist);
    } catch (error) {
      console.error('Get artist error:', error.message);
      res.status(500).json({ error: 'Failed to get artist details' });
    }
  },

  // Get chart/trending tracks
  async getChart(req, res) {
    try {
      const { limit = 50 } = req.query;
      const chart = await deezerService.getChart(limit);
      res.json(chart);
    } catch (error) {
      console.error('Get chart error:', error.message);
      res.status(500).json({ error: 'Failed to get chart data' });
    }
  },

  // Get available genres
  async getGenres(req, res) {
    try {
      const genres = await deezerService.getGenres();
      res.json(genres);
    } catch (error) {
      console.error('Get genres error:', error.message);
      res.status(500).json({ error: 'Failed to get genres' });
    }
  },

  // Get tracks by genre
  async getTracksByGenre(req, res) {
    try {
      const { id } = req.params;
      const { limit = 25 } = req.query;
      const tracks = await deezerService.getTracksByGenre(id, limit);
      res.json(tracks);
    } catch (error) {
      console.error('Get tracks by genre error:', error.message);
      res.status(500).json({ error: 'Failed to get tracks by genre' });
    }
  }
};

module.exports = musicController;