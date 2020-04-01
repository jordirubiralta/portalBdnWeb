const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
    question: {
        type: String, 
        required: true,
    },
    yes: {
        type: Number,
        required: true
    },
    no: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Incident', IncidentSchema);