// Seleksi elemen DOM
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const noteDetailModal = document.getElementById("noteDetailModal");
const modalNoteTitle = document.getElementById("modalNoteTitle");
const modalNoteContent = document.getElementById("modalNoteContent");
const closeModal = document.getElementById("closeModal");

// API endpoint
const API_URL = "http://localhost:3000/notes";

// Fetch and display all notes
function fetchNotes() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      notesList.innerHTML = ""; // Clear the list
      data.forEach((note) => displayNote(note));
    })
    .catch((error) => console.error("Error fetching notes:", error));
}

// Add a new note
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  const noteData = { title, content };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  })
    .then((response) => response.json())
    .then(() => {
      noteForm.reset(); // Clear form
      fetchNotes(); // Refresh notes
    })
    .catch((error) => console.error("Error adding note:", error));
});

// Display a single note
function displayNote(note) {
  const noteElement = document.createElement("div");
  noteElement.className = "p-4 bg-gray-100 rounded-lg shadow-md";

  noteElement.innerHTML = `
    <h3 class="text-lg font-semibold text-gray-800">${note.title}</h3>
    <p class="text-sm text-gray-600 mb-2">${new Date(note.createdAt).toLocaleString()}</p>
    <div class="text-gray-700 mb-4">${note.content}</div>
    <div class="flex justify-between">
      <button class="bg-blue-500 text-white px-3 py-1 rounded" onclick="showDetail(${note.id})">Detail</button>
      <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteNote(${note.id})">Delete</button>
    </div>
  `;

  notesList.appendChild(noteElement);
}

// Show note detail in modal
function showDetail(id) {
  fetch(`${API_URL}/${id}`)
    .then((response) => response.json())
    .then((note) => {
      modalNoteTitle.textContent = note.title;
      modalNoteContent.textContent = note.content;
      noteDetailModal.classList.remove("hidden");
    })
    .catch((error) => console.error("Error fetching note details:", error));
}

// Close modal
closeModal.addEventListener("click", () => {
  noteDetailModal.classList.add("hidden");
});

// Delete a note
function deleteNote(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => fetchNotes())
    .catch((error) => console.error("Error deleting note:", error));
}

// Initial fetch
fetchNotes();
