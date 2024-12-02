const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.static('public'));

// Setup koneksi database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username DB Anda
  password: '', // Ganti dengan password DB Anda
  database: 'notes_db' // Pastikan database ini sudah ada
});

// Cek koneksi database
connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Endpoint untuk menambahkan note
app.post('/notes', (req, res) => {
  const { note, deadline } = req.body;
  if (!note || !deadline) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO notes (note, deadline) VALUES (?, ?)';
  connection.query(query, [note, deadline], (err, results) => {
    if (err) {
      console.error('Error inserting note:', err);
      return res.status(500).send('Error creating note');
    }
    res.status(201).send({ message: 'Note created successfully', id: results.insertId });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
