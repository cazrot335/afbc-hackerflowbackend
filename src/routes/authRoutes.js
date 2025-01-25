const express = require('express');
const { signup, login, googleAuth, googleAuthRedirect } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/google/redirect', googleAuthRedirect);

module.exports = router;