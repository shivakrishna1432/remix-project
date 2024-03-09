import { getStoredNotes, notesLength, storeNotes } from "~/data/notes";
import NewNotes from "./components/Newnotes";
import { ActionFunction, redirect } from "@remix-run/node";
import NoteList from "./components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { formatedDate } from "../helper";

type notesProps = {
  title: string;
  content: string;
  id: number;
  date: string;
};

const Notes = () => {
  const notes: notesProps[] = useLoaderData();
  return (
    <div className="bg-violet-500">
      <NewNotes />
      <NoteList notes={notes} />
    </div>
  );
};

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}
export const action: ActionFunction = async ({ request }) => {
  const noteLength = await notesLength();
  const formData = await request.formData();
  const notesData = Object.fromEntries(formData);
  //add validation
  const existingNotes = await getStoredNotes();
  notesData.id = noteLength + 1;
  const date = new Date();
  notesData.date = formatedDate(date);
  const updatedNotes = existingNotes.concat(notesData);
  await storeNotes(updatedNotes);

  return redirect("/notes");
};
export default Notes;
