const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const axios = require('axios');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { name, contact, location } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.profile.name = name || user.profile.name;
    user.profile.contact = contact || user.profile.contact;

    // Fetch dynamic location using Nominatim
    if (location) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: 'json',
          limit: 1
        }
      });
      if (response.data.length > 0) {
        user.profile.location = response.data[0].display_name;
      } else {
        user.profile.location = location;
      }
    }

    console.log('Profile before saving:', user.profile); // Log the profile data before saving
    await user.save();
    res.json(user.profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload profile picture
const uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compress image using sharp
    const compressedImagePath = `uploads/compressed-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.path)
      .resize(300, 300)
      .toFile(compressedImagePath);

    user.profile.profilePic = compressedImagePath;
    console.log('Profile before saving:', user.profile); // Log the profile data before saving
    await user.save();
    res.json({ url: compressedImagePath });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePic,
  upload
};