import { Link, useLoaderData } from "@remix-run/react";

import { getStoredNotes } from "~/data/notes";

type paramsProps = {
  params: {
    noteId: string;
  };
};

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: paramsProps) {
  const notes = await getStoredNotes();
  const noteId = Number(params.noteId);
  const selectedNote = notes.find((note) => note.id === noteId);
  return selectedNote;
}
