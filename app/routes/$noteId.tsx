import { Link, json, useLoaderData } from "@remix-run/react";

import { getStoredNotes } from "~/data/notes";

type paramsProps = {
  params: {
    noteId: string;
  };
};

type noteProps = {
  title: string;
  content: string;
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
          <Link to="/" className="underline text-red-200 my-3">
            Back to all Notes
          </Link>
          <h1 className="text-3xl font-semibold my-3">{note.title}</h1>
          <p className="my-3">{note.content}</p>
        </div>
      </div>
    </>
  );
}

export async function loader({ params }: paramsProps) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: noteProps) => note.title === noteId);
  if (!selectedNote) {
    throw json(
      { message: "could not find the path " + noteId },
      { status: 404 }
    );
  }
  return selectedNote;
}
