const axios = require('axios');

const DEEZER_API_URL = process.env.DEEZER_API_URL || 'https://api.deezer.com';

const deezerService = {
  // Search for tracks, albums, artists
  async search(query, type = 'track', limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/search/${type}`, {
        params: {
          q: query,
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Deezer search failed: ${error.message}`);
    }
  },

  // Get track by ID
  async getTrack(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/track/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get track: ${error.message}`);
    }
  },

  // Get album by ID
  async getAlbum(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/album/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get album: ${error.message}`);
    }
  },

  // Get artist by ID
  async getArtist(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/artist/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get artist: ${error.message}`);
    }
  },

  // Get top tracks/charts
  async getChart(limit = 50) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/chart/0/tracks`, {
        params: {
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get chart: ${error.message}`);
    }
  },

  // Get all genres
  async getGenres() {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/genre`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get genres: ${error.message}`);
    }
  },

  // Get tracks by genre
  async getTracksByGenre(genreId, limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/genre/${genreId}/artists`, {
        params: {
          limit,
          output: 'json'
        }
      });
      
      // Get tracks from the first artist in the genre
      if (response.data.data && response.data.data.length > 0) {
        const artistId = response.data.data[0].id;
        const tracksResponse = await axios.get(`${DEEZER_API_URL}/artist/${artistId}/top`, {
          params: {
            limit,
            output: 'json'
          }
        });
        return tracksResponse.data;
      }
      
      return { data: [] };
    } catch (error) {
      throw new Error(`Failed to get tracks by genre: ${error.message}`);
    }
  },

  // Get artist's top tracks
  async getArtistTopTracks(artistId, limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/artist/${artistId}/top`, {
        params: {
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get artist top tracks: ${error.message}`);
    }
  },

  // Get album tracks
  async getAlbumTracks(albumId) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/album/${albumId}/tracks`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get album tracks: ${error.message}`);
    }
  }
};

module.exports = deezerService;