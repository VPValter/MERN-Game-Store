const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foundingDate: Date,
    hq: String,
    web: {
        type: String,
        required: true
    }
});

module.exports = Dev = mongoose.model('dev', DevSchema);