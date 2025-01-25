const express = require('express');
const { signup, login, googleAuth, googleAuthRedirect, refreshToken } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/google/redirect', googleAuthRedirect);
router.post('/refresh-token', refreshToken);

module.exports = router;