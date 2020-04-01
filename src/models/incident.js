const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncidentSchema = new Schema({
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
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    resolved: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Incident', IncidentSchema);