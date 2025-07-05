const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

// Search for tracks, albums, artists
router.get('/search', musicController.searchMusic);

// Get track details by ID
router.get('/track/:id', musicController.getTrackById);

// Get album details by ID
router.get('/album/:id', musicController.getAlbumById);

// Get artist details by ID
router.get('/artist/:id', musicController.getArtistById);

// Get top tracks/charts
router.get('/chart', musicController.getChart);

// Get genres
router.get('/genres', musicController.getGenres);

// Get tracks by genre
router.get('/genre/:id/tracks', musicController.getTracksByGenre);

module.exports = router;