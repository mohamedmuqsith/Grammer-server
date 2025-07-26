const mongoose = require('mongoose');

const grammarSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['tense', 'part-of-speech', 'be-verb', 'preposition', 'either-neither']
    },
    title: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    examples: [String],
    notes: String
});

module.exports = mongoose.model('Grammar', grammarSchema);