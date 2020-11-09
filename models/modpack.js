const mongoose = require('mongoose');

const modpackSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    mods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modpack',
        required: false
    }],
    title: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: false
    },
    theme: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model('Modpack', modpackSchema);