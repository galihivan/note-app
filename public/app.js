const apiUrl = 'http://localhost:3000/notes';

// Fetch and display all notes
function fetchNotes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = ''; // Clear previous list

            data.forEach(note => {
                const row = document.createElement('tr');
                
                const noteTitle = document.createElement('td');
                noteTitle.classList.add('px-4', 'py-2', 'border');
                noteTitle.textContent = note.title;
                
                const noteBody = document.createElement('td');
                noteBody.classList.add('px-4', 'py-2', 'border');
                noteBody.textContent = note.note;

                const noteDate = document.createElement('td');
                noteDate.classList.add('px-4', 'py-2', 'border');
                noteDate.textContent = new Date(note.datetime).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

                const actionsTd = document.createElement('td');
                actionsTd.classList.add('px-4', 'py-2', 'border');
                
                // Edit Button
                const editBtn = document.createElement('button');
                editBtn.classList.add('bg-yellow-500', 'text-white', 'px-2', 'py-1', 'rounded', 'mr-2');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => editNote(note.id, note.title, note.note, note.datetime);
                
                // Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteNote(note.id);

                actionsTd.appendChild(editBtn);
                actionsTd.appendChild(deleteBtn);

                row.appendChild(noteTitle);
                row.appendChild(noteBody);
                row.appendChild(noteDate);
                row.appendChild(actionsTd);
                
                notesList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}

// Add a new note
document.getElementById('note-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    const datetime = document.getElementById('date').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, datetime, note }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchNotes(); // Refresh notes list
        document.getElementById('note-form').reset(); // Reset form
    })
    .catch(error => console.error('Error adding note:', error));
});

// Edit an existing note
function editNote(id, currentTitle, currentNote, currentDatetime) {
    const newTitle = prompt('Edit Title:', currentTitle);
    const newNote = prompt('Edit Note:', currentNote);
    const newDatetime = prompt('Edit Date (YYYY-MM-DD):', currentDatetime.slice(0, 10)); // Format 'YYYY-MM-DD'

    if (newTitle && newNote && newDatetime) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, datetime: newDatetime, note: newNote }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchNotes(); // Refresh notes list
        })
        .catch(error => console.error('Error editing note:', error));
    }
}

// Delete a note
function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchNotes(); // Refresh notes list
        })
        .catch(error => console.error('Error deleting note:', error));
    }
}

// Initial fetch notes
fetchNotes();
