const express = require('express');
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, bookAppointment).get(protect, getAppointments);

module.exports = router;