const express = require('express');
const { getProfile, updateProfile, uploadProfilePic, upload } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getProfile).put(protect, updateProfile);
router.route('/upload').post(protect, upload.single('profilePic'), uploadProfilePic);

module.exports = router;