// Authentication Routes
const express = require('express');
const router = express.Router();
const { getCurrentUser, register, login } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');

/**
 * @route   GET /api/auth/me
 * @desc    Get current user information
 * @access  Private (requires authentication)
 */
router.get('/me', authenticate, getCurrentUser);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user (handled by Firebase Auth client)
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user (handled by Firebase Auth client)
 * @access  Public
 */
router.post('/login', login);

module.exports = router;
