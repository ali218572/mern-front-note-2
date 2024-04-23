/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Note as NoteModel } from "../App";
import FormatDate from "../utils/FormatDate";

interface NoteTypes {
  note: NoteModel;
}
function Note({ note }: NoteTypes) {
  const { createdAt, text, title, updatedAt } = note;
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated " + FormatDate(updatedAt);
  } else {
    createdUpdatedText = "Created " + FormatDate(createdAt);
  }

  return (
    <div className="w-full p-4 m-4 rounded-lg   bg-gray-200 border-gray-800 shadow-lg  text-nowrap">
      {" "}
      <div className="">
        <h3 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4 ">
            <div className="flex items-center ">
              <div className=" w-full flex flex-col  justify-between space-y-4 ">
                <p className=" text-xl font-medium text-gray-900 truncate dark:text-white text-wrap ">
                  {text}
                </p>
                <p className="text-sm text-gray-500">{createdUpdatedText}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Note;
