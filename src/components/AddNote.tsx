import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { postNote } from "@/utils/NotesApi";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BiPlus } from "react-icons/bi";

const AddNote = ({ setNotes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data) => {
    setIsOpen(false); // Close dialog after submission
    try {
      const newNote = await postNote(data);
      if (newNote) {
        setNotes((prevNotes) => [...prevNotes, newNote]); // Update notes list
        // Reset form after successful submission
        reset();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const onClickDialog = () => setIsOpen((prevValue) => !prevValue);

  return (
    <Dialog open={isOpen} onOpenChange={onClickDialog}>
      <DialogTrigger asChild>
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-slate-50 rounded-xl mt-4 w-28 text-lg py-4 px-10"
          aria-label="Open Add Note Dialog"
        >
          <div className="flex  items-center ">
            <BiPlus className="w-6 h-6" />
            Add Note
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle>Add a Note</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              {...register("title", { required: true })} // Register input with validation
              className={`col-span-3 w-72 text-lg leading-6 ${
                errors.title ? "text-red-500" : ""
              }`}
            />
            <br />
            {errors.title && <p className="text-red-500 ml-2"> (Required)</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Text
            </Label>
            <Textarea
              placeholder="Type your text here."
              id="username"
              {...register("text", { required: true })} // Register textarea with validation
              {...register("text", { required: true })}
              className={`col-span-3 w-72 text-lg leading-6 ${
                errors.text ? "text-red-500" : ""
              }`}
              rows={4}
            />
            <br />

            {errors.text && <p className="text-red-500 ml-2"> (Required)</p>}
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button
            type="submit"
            className={`bg-gray-500 hover:bg-gray-700 text-slate-50 rounded-xl mt-4 w-28 py-4 px-8 transform transition duration-300 ease-in-out hover:scale-105 ${
              isLoading ? "disabled:opacity-50" : ""
            }`}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
