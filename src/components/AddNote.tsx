/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Note } from "@/App";
import { fetchNotes, postNote } from "@/utils/NotesApi";

const AddNote = ({ setNotes }) => {
  // Pass onClose prop from App.tsx
  const titleRef = useRef<HTMLInputElement>(null); // Ref for input field
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");

  const onClickSave = async () => {
    const note = {
      title: titleRef.current?.value || "",
      text: textAreaRef.current?.value || "",
    };
    if (!note.text.trim() || !note.title.trim()) {
      return; // Do nothing if content is empty
    }

    const newNote = await postNote(note); // Call createNote with state setter and ref
    if (newNote) {
      alert("Note created successfully");
      setInputValue("");
      setTextValue("");
      onClickDialog(); // Call onClose prop to close the modal
      // Fetch notes again after successful save
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes); // Assuming you have access to setNotes in AddNote.tsx (likely passed as a prop from App.tsx)
    }
  };

  const onClickDialog = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <Dialog open={open} onOpenChange={onClickDialog}>
      <DialogTrigger asChild>
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-slate-50 rounded-xl mt-4 w-28 text-lg py-4 px-8"
          aria-label="Open Add Note Dialog"
        >
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle>Add a Note</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={inputValue} // Set input value from state
              className="col-span-3"
              ref={titleRef} // Assign ref to input
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Text
            </Label>
            <Textarea
              placeholder="Type your text here."
              id="username"
              className="w-72 text-left "
              ref={textAreaRef} // Assign ref to textarea
              onChange={(e) => setTextValue(e.target.value)}
              value={textValue}
            />
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button
            type="submit"
            className="bg-gray-500 hover:bg-gray-700 text-slate-50 rounded-xl mt-4 w-28  "
            onClick={onClickSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;

// cc
