const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    pricing: Number,
    availability: String,
    specialOffers: String,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;