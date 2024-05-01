import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

function DialogBody({ setNotes }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();
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
  return (
    <DialogContent className="sm:max-w-[425px] bg-slate-50 rounded-3xl">
      <DialogHeader>
        <DialogTitle>Edit Note</DialogTitle>{" "}
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
  );
}

export default DialogBody;
