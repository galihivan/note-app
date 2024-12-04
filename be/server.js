const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Konfigurasi database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti dengan password Anda
    database: 'notes_db' // Pastikan nama database sesuai dengan yang Anda buat
});

// Menghubungkan ke database MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.use(express.json());
app.use(cors());

// Endpoint untuk mendapatkan semua notes
app.get('/api/notes', (req, res) => {
    const query = 'SELECT * FROM notes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).send('Error fetching notes');
        }
        res.json(results);
    });
});

// Endpoint untuk menambah note baru
app.post('/api/notes', (req, res) => {
    const { title, note, datetime } = req.body;
    const query = 'INSERT INTO notes (title, note, datetime) VALUES (?, ?, ?)';
    db.query(query, [title, note, datetime], (err, results) => {
        if (err) {
            console.error('Error creating note:', err);
            return res.status(500).send('Error creating note');
        }
        res.status(201).json({
            id: results.insertId,
            title,
            note,
            datetime
        });
    });
});

// Endpoint untuk mengupdate note berdasarkan ID
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, note, datetime } = req.body;
    const query = 'UPDATE notes SET title = ?, note = ?, datetime = ? WHERE id = ?';
    db.query(query, [title, note, datetime, id], (err, results) => {
        if (err) {
            console.error('Error updating note:', err);
            return res.status(500).send('Error updating note');
        }
        res.status(200).json({
            id,
            title,
            note,
            datetime
        });
    });
});

// Endpoint untuk menghapus note berdasarkan ID
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notes WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting note:', err);
            return res.status(500).send('Error deleting note');
        }
        res.status(204).end();
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
