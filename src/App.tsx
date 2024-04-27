import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Note";
import { fetchNotes } from "./utils/NotesApi";
import AddNote from "./components/AddNote"; // Import AddNote component
import { Button } from "./components/ui/button";

export interface Note {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddNoteForm, setShowAddNoteForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        // Handle the error here, e.g., display an error message to the user
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or error)
      }
    };

    getNotes();
  }, []);

  const handleOpenAddNoteForm = () => {
    setShowAddNoteForm(true);
  };

  const handleCloseAddNoteForm = () => {
    setShowAddNoteForm(false);
  };

  const loadingStatement = <h1>Loading...</h1>;

  return (
    <>
      <div className="text-center ">
        <h1 className="text-center p-8 pb-0 md:pt-16">MERN Notes</h1>

        {/* Button to trigger AddNote form */}

        {showAddNoteForm && (
          <div className="modal">
            <AddNote setNotes={setNotes} isLoading={isLoading} />
          </div>
        )}

        {/* Rest of your note display logic */}
        {notes.length > 0 ? (
          // Conditionally render loading or note list based on isLoading state
          isLoading ? (
            loadingStatement
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8 md:p-32 sm:gap-4 text-wrap overflow-hidden md:gap-8 text-center">
              {notes.map((note) => (
                <div key={note._id} className="text-3xl max-w-lg m-auto">
                  <Note note={note} />
                </div>
              ))}
            </div>
          )
        ) : (
          // Only display "No notes found" when notes are empty and not loading
          !isLoading && (
            <h1 className="text-center flex justify-center items-center min-h-screen">
              No notes found.
            </h1>
          )
        )}
      </div>
    </>
  );
}

export default App;
