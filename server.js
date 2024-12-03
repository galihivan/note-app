const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Dummy database in memory
let notes = [
    { id: 1, title: 'Note 1', note: 'This is note 1', datetime: '2024-12-01T10:00:00Z' },
    { id: 2, title: 'Note 2', note: 'This is note 2', datetime: '2024-12-02T11:00:00Z' },
];

// Endpoint to get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Endpoint to add a new note
app.post('/notes', (req, res) => {
    const { title, datetime, note } = req.body;
    const newNote = {
        id: notes.length + 1,
        title,
        datetime,
        note,
    };
    notes.push(newNote);
    res.json({ message: 'Note added successfully', note: newNote });
});

// Endpoint to edit a note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const noteIndex = notes.findIndex(n => n.id == id);
    
    if (noteIndex !== -1) {
        notes[noteIndex] = { id, title, datetime, note };
        res.json({ message: 'Note updated successfully', note: notes[noteIndex] });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

// Endpoint to delete a note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    notes = notes.filter(n => n.id != id);
    res.json({ message: 'Note deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
