const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');
const { sendEmail } = require('../utils/email');
const { generateQRCode } = require('../utils/qrCode');

const bookAppointment = async (req, res) => {
  const { service, date, paymentMethod } = req.body;

  try {
    const appointment = new Appointment({
      user: req.user._id,
      service,
      date,
      paymentMethod,
    });

    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    const user = await User.findById(appointment.user);
    const provider = await User.findById(appointment.provider);

    if (status === 'confirmed') {
      await sendEmail(user.email, 'Appointment Confirmed', 'Your appointment has been confirmed.');
      await sendEmail(provider.email, 'Appointment Confirmed', 'You have a new confirmed appointment.');
    } else if (status === 'rejected') {
      await sendEmail(user.email, 'Appointment Rejected', 'Your appointment has been rejected.');
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).populate('service');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookAppointment,
  updateAppointmentStatus,
  getAppointments,
};