export interface Note {
  title: string;
  text: string;
}
export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/notes/", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error; // Re-throw the error to allow proper error handling in App.tsx
  }
};

export const postNote = async (note: Note): Promise<Note> => {
  try {
    const response = await fetch("http://localhost:5000/api/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const newNote = await response.json();
    return newNote;
  } catch (error) {
    console.error("Error posting note:", error);
    throw error; // Re-throw the error to allow proper error handling
  }
};
export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return; // No content expected on successful DELETE
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error; // Re-throw the error to allow proper error handling in App.tsx
  }
};

export const updateNote = async (
  noteId: string,
  updatedNote: Partial<Note>
): Promise<Note> => {
  try {
    const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote), // Only send updated properties
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const updatedNoteData = await response.json();
    return updatedNoteData;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error; // Re-throw the error to allow proper error handling in App.tsx
  }
};
