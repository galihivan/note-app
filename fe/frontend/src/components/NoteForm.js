import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteForm = ({ noteToEdit, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [datetime, setDatetime] = useState('');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.note);
            setDatetime(noteToEdit.datetime);
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, note: content, datetime };

        if (noteToEdit) {
            // Update note
            axios
                .put(`http://localhost:5000/api/notes/${noteToEdit.id}`, data)
                .then(() => onSave())
                .catch((error) => console.error('Error updating note:', error));
        } else {
            // Create new note
            axios
                .post('http://localhost:5000/api/notes', data)
                .then(() => onSave())
                .catch((error) => console.error('Error creating note:', error));
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">{noteToEdit ? 'Edit Note' : 'Add New Note'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Datetime</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {noteToEdit ? 'Update Note' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteForm;
