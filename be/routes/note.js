// note.js
const express = require('express');
const router = express.Router();
const noteModel = require('../models/noteModel');

// Route untuk mendapatkan semua catatan
router.get('/notes', (req, res) => {
    noteModel.getAll((err, notes) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
            return;
        }
        res.status(200).json(notes);
    });
});

module.exports = router;
