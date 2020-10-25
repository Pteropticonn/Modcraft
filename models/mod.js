
const mongoose = require('mongooze');
const modSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
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
    genre: {
        type: String,
        required: false
    }

});