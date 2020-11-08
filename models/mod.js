const mongoose = require('mongoose');
const modSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    modpacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mod'
    }],
    fileSize: {
        type: Number,
        required: true
    },
    version: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [ {
        type: String,
        required: false
    }]

});

module.exports = mongoose.model('Mod', modSchema);