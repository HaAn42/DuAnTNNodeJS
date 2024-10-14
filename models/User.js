const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);
