const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {type: String},
    favGenres: { type: [String] },
    bio: {type: String},
    githubusername: {type: String},
    social: {
        twitter: {type: String},
        facebook: {type: String},
        youtube: {type: String},
        twitch: {type: String},
        instagram: {type: String}
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);