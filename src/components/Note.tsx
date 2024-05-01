import { useState } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Note as NoteModel } from "../App";
import FormatDate from "../utils/FormatDate";
import { FaDeleteLeft as Delete } from "react-icons/fa6";

interface NoteTypes {
  note: NoteModel;
  onDelete: (noteId: string) => void; // Function to handle delete
  setSelectedNote: (note: NoteModel) => void; // Function to set selected note
}

function Note({ note, onDelete, setSelectedNote }: NoteTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { createdAt, text, title, _id, updatedAt } = note;
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated " + FormatDate(updatedAt);
  } else {
    createdUpdatedText = "Created " + FormatDate(createdAt);
  }

  const handleClick = () => {
    setSelectedNote(note); // Set the entire note object for editing
    setIsOpen(true); // Open AddNote dialog in edit mode (missing line added)
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await onDelete(note._id); // Pass the note ID to the onDelete function
        // Optional: Consider alternative approaches to handle deletion UX (e.g., visual feedback)
      } catch (error) {
        console.error("Error deleting note:", error);
        // Handle deletion errors (e.g., display an error message)
      }
    }
  };

  return (
    <div
      className="w-full p-4 m-4 rounded-lg bg-gray-200 border-gray-800 shadow-lg text-nowrap relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center  ">
        {" "}
        {/* Use flexbox for positioning */}
        <div className="">
          <h3 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <button
          onClick={handleDelete}
          className="text-purple-500 bg-transparent   w-8 p-0  outline-none absolute right-0 top-0 m-2"
        >
          <Delete size={25} /> {/* Set size to 16 for a smaller icon */}
        </button>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="w-full flex flex-col justify-between space-y-4">
              <p className="text-xl font-medium text-gray-900 truncate dark:text-white text-wrap">
                {text}
              </p>
              <p className="text-sm text-gray-500">{createdUpdatedText}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Note;
