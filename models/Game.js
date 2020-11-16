const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // figure out IMAGES ***
    posterImg: {
        type: String,
        required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dev'
    },
    // publisher: String,
    date: Date,
    tags: [String],
    description: String,
    price: {
        type: Number,
        required: true
    }
});

module.exports = Game = mongoose.model('game', GameSchema);