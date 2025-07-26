const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Grammar = require('./Grammar'); // Import the model

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// --- Database Connection ---
// IMPORTANT: Replace with your actual MongoDB connection string
const dbURI = 'mongodb+srv://Mukshith:123@cluster0.aivozly.mongodb.net/grammar-hub?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// --- API Routes ---

/**
 * @route   GET /api/grammar
 * @desc    Get all grammar content from the database
 */
app.get('/api/grammar', async (req, res) => {
    try {
        const grammarData = await Grammar.find();
        res.json(grammarData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve data from database.', error: err });
    }
});

/**
 * @route   POST /api/grammar
 * @desc    Add a new piece of grammar content to the database
 */
app.post('/api/grammar', async (req, res) => {
    const { category, title, definition, examples, notes } = req.body;

    // Basic validation
    if (!category || !title || !definition) {
        return res.status(400).json({ message: 'Category, title, and definition are required.' });
    }

    const newContent = new Grammar({
        category,
        title,
        definition,
        examples,
        notes
    });

    try {
        const savedContent = await newContent.save();
        res.status(201).json(savedContent); // Respond with the newly created item
    } catch (err) {
        res.status(500).json({ message: 'Failed to save new content.', error: err });
    }
});


// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});