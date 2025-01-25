const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', isAuthenticated, getUserProfile);

module.exports = router;