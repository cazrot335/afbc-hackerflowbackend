const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'declined'],
        default: 'pending',
    },
    scheduledTime: Date,
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;