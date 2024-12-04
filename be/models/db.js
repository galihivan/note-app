const db = require('./db');  // Mengimpor koneksi database

const getAll = (callback) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

module.exports = { getAll };
