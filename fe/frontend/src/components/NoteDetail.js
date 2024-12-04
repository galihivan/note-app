import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; // Untuk mengambil id note dari URL

const NoteDetail = () => {
    const { noteId } = useParams(); // Ambil noteId dari URL
    const [note, setNote] = useState(null);
    const history = useHistory(); // Digunakan untuk navigasi "Back"

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
                setNote(response.data);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        if (noteId) fetchNote();
    }, [noteId]);

    if (!note) return <p>Loading...</p>;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg">
                <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
                <p className="mb-2 text-sm text-gray-500">
                    Created at: {new Date(note.datetime).toLocaleString()}
                </p>
                <p className="mb-4">{note.note}</p> {/* Menampilkan seluruh detail note */}

                {/* Tombol Back */}
                <button
                    onClick={() => history.goBack()} // Tombol untuk kembali ke halaman sebelumnya
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default NoteDetail;
