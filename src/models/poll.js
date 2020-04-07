const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
    question: {
        type: String, 
        required: true,
    },
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Poll', PollSchema);