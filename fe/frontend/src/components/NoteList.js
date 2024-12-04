import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null); // Track which note is being edited
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [noteToView, setNoteToView] = useState(null); // Note for detail view

    // Fetch notes on component mount
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/notes')
            .then((response) => {
                setNotes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });
    }, [notes]); // Trigger refetching of notes when notes change

    // Handle deleting a note
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/notes/${id}`)
            .then(() => {
                setNotes(notes.filter((note) => note.id !== id)); // Remove deleted note from UI
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
            });
    };

    // Handle opening the modal with note data for editing
    const handleEdit = (note) => {
        setNoteToEdit(note); // Set the note to be edited
        setIsModalOpen(true); // Show the modal
    };

    // Handle opening the modal with note data for viewing detail
    const handleViewDetail = (note) => {
        setNoteToView(note); // Set the note to be viewed
        setIsModalOpen(true); // Show the modal
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setNoteToEdit(null); // Clear the note being edited
        setNoteToView(null); // Clear the note being viewed
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Notes</h2>
            <table className="min-w-full table-auto text-sm">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Note</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{note.title}</td>
                            <td className="px-4 py-2">
                            <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">{note.note}</div>
                            </td>
                            <td className="px-4 py-2">{new Date(note.datetime).toLocaleDateString('en-CA')}</td>
                            <td className="px-4 py-2 flex justify-center space-x-2">
                            <button
                                    onClick={() => handleViewDetail(note)} // View Detail
                                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                                >
                                    Detail
                                </button>
                                <button
                                    onClick={() => handleEdit(note)} // Open modal on Edit
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                
                               
                                <button
                                    onClick={() => handleDelete(note.id)} // Delete note
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditionally render the modal */}
            {isModalOpen && (
                <div className="modal">
                    {noteToView ? (
                        <div className="note-detail p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold">{noteToView.title}</h2>
                            <p className="mt-2 text-sm text-gray-600">{noteToView.note}</p>
                            <p className="mt-4 text-xs text-gray-500">Created at: {noteToView.datetime}</p>
                            <button
                                onClick={handleCloseModal} // Close modal on Close button
                                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <NoteForm
                            noteToEdit={noteToEdit}
                            onSave={handleCloseModal} // Close modal after save
                            setNoteToEdit={setNoteToEdit} // Pass setter function
                            setIsModalOpen={setIsModalOpen} // Pass setter function for modal visibility
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default NoteList;
