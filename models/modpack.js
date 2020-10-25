const mongoose = require('mongoose');

const modpackSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        required: false
    },
    
})