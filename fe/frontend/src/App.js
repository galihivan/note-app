import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
    const [notes, setNotes] = useState([]); // State untuk semua notes
    const [noteToEdit, setNoteToEdit] = useState(null); // State untuk note yang akan di-edit
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk membuka/menutup modal

    // Fetch data dari backend saat komponen mount
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios
            .get('http://localhost:5000/api/notes')
            .then((response) => {
                setNotes(response.data); // Simpan data notes di state
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });
    };

    // Handle delete note
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            axios
                .delete(`http://localhost:5000/api/notes/${id}`)
                .then(() => {
                    fetchNotes(); // Refresh data setelah delete
                })
                .catch((error) => {
                    console.error('Error deleting note:', error);
                });
        }
    };

    // Handle edit note
    const handleEdit = (note) => {
        setNoteToEdit(note); // Kirim note ke form untuk edit
        setIsModalOpen(true); // Buka modal saat mengedit
    };

    // Handle save (dari NoteForm)
    const handleSave = () => {
        setNoteToEdit(null); // Reset form setelah save
        setIsModalOpen(false); // Tutup modal setelah save
        fetchNotes(); // Refresh data setelah save
    };

    // Handle cancel (dari NoteForm)
    const handleCancel = () => {
        setNoteToEdit(null); // Reset form setelah cancel
        setIsModalOpen(false); // Tutup modal setelah cancel
    };

    // Handle add new note
    const handleAddNewNote = () => {
        setNoteToEdit(null); // Tidak ada catatan yang diedit
        setIsModalOpen(true); // Buka modal untuk menambahkan catatan baru
    };

    return (
        <div className="App">
            <h1 className="text-4xl font-bold text-center my-6">Note App</h1>
            <div className="max-w-4xl mx-auto">
                {/* Tombol untuk menambah catatan baru */}
                <button
                    onClick={handleAddNewNote}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Add New Note
                </button>

                {/* Tampilkan modal jika isModalOpen adalah true */}
                {isModalOpen && (
                    <NoteForm
                        noteToEdit={noteToEdit}
                        onSave={handleSave}
                        onCancel={handleCancel} // Fungsi untuk cancel
                    />
                )}

                {/* Note List */}
                <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default App;
