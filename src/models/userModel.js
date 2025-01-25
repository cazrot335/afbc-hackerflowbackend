const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // Make password optional for OAuth users
    },
    role: {
        type: String,
        enum: ['service_provider', 'service_user'],
        required: true,
    },
    profile: {
        name: String,
        contact: String,
        location: String,
        businessName: String,
        GSTNo: String,
        photo: String,
        services: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }]
    },
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;