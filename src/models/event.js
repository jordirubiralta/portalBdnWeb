const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    img: {
        type: String,
        required: true,
        default: 'img'
    },
    location: {
        type: String,
        required: true
    },
    organizator: {
        type: String        
    },
    user: { 
        type: String
    }
});

module.exports = mongoose.model('Event', EventSchema);