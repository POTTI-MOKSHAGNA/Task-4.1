const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User login (demo purposes - stores session)
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Check session status
router.get('/session', authController.getSession);

// Demo user registration
router.post('/register', authController.register);

module.exports = router;