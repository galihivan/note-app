const db = require('./db');

const NoteModel = {
    getAll: (callback) => {
        db.query('SELECT * FROM notes', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM notes WHERE id = ?', [id], callback);
    },
    create: (note, callback) => {
        db.query('INSERT INTO notes SET ?', note, callback);
    },
    update: (id, note, callback) => {
        db.query('UPDATE notes SET ? WHERE id = ?', [note, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM notes WHERE id = ?', [id], callback);
    },
};

module.exports = NoteModel;
