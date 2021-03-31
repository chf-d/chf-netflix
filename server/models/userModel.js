const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    movies: {
        type: Array
    },
    name: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);