import { Form, Link, useLoaderData } from "@remix-run/react";
import { MdDelete } from "react-icons/md";

import { getStoredNotes } from "~/data/notes";

type paramsProps = {
  params: {
    noteId: string;
  };
};

type noteProps = {
  title: string;
  content: string;
  id: string;
};

export default function NoteDetailsPage() {
  const note: noteProps = useLoaderData();

  return (
    <>
      <h1 className="text-white text-center font-bold text-3xl">
        Note Details
      </h1>
      <div className="flex justify-center pt-10">
        <div className="bg-indigo-800 p-4 w-[500px] rounded-md text-white text-center">
          <Link to="/notes" className="underline text-red-200 my-3">
            Back to all Notes
          </Link>
          <h1 className="text-3xl font-semibold my-3">{note.title}</h1>
          <p className="my-3">{note.content}</p>
          <Form
            action="destroy"
            method="post"
            onSubmit={(e) => {
              const response = confirm(
                "Please confirm you want to delete this note"
              );
              if (!response) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="text-3xl">
              <MdDelete />
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export async function loader({ params }: paramsProps) {
  const notes = await getStoredNotes();
  const noteId = String(params.noteId);
  const selectedNote = notes.find((note: noteProps) => note.id === noteId);
  if (!selectedNote) {
    throw new Response("could not find the path", { status: 404 });
  }
  return selectedNote;
}
