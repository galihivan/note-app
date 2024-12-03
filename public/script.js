const apiUrl = 'http://localhost:3000/notes';

// Fetch and display all notes
function fetchNotes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = ''; // Clear previous list

            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('bg-white', 'p-4', 'rounded', 'shadow', 'flex', 'justify-between', 'items-center');
                
                const noteContent = document.createElement('div');
                noteContent.classList.add('flex', 'flex-col');
                
                const noteTitle = document.createElement('h3');
                noteTitle.classList.add('font-semibold');
                noteTitle.textContent = note.title;
                
                const noteBody = document.createElement('p');
                noteBody.classList.add('text-gray-600');
                noteBody.textContent = note.note;

                // Menambahkan tanggal pada tampilan
                const noteDate = document.createElement('p');
                noteDate.classList.add('text-sm', 'text-gray-500');
                // Menggunakan new Date untuk mengubah datetime dan format tanggal
                noteDate.textContent = new Date(note.datetime).toLocaleString(); 

                noteContent.appendChild(noteTitle);
                noteContent.appendChild(noteBody);
                noteContent.appendChild(noteDate); // Tampilkan tanggal
                
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('flex', 'space-x-2');
                
                // Edit Button
                const editBtn = document.createElement('button');
                editBtn.classList.add('bg-yellow-500', 'text-white', 'px-2', 'py-1', 'rounded');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => editNote(note.id, note.title, note.note);
                
                // Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteNote(note.id);
                
                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);

                noteDiv.appendChild(noteContent);
                noteDiv.appendChild(actionsDiv);
                notesList.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}

// Add a new note
document.getElementById('note-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    
    // Menambahkan tanggal saat catatan dibuat
    const datetime = new Date().toISOString();

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
function editNote(id, currentTitle, currentNote) {
    const newTitle = prompt('Edit Title:', currentTitle);
    const newNote = prompt('Edit Note:', currentNote);

    if (newTitle && newNote) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, datetime: new Date().toISOString(), note: newNote }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchNotes(); // Refresh notes list
        })
        .catch(error => console.error('Error editing note:', error));
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

// Initial fetch notes
fetchNotes();
