import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "~/data/notes";

const DeletePage = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

type noteProps = {
  id: string;
};

function deleteNote(data, id: string) {
  return data.filter((note: noteProps) => note.id !== id);
}
export async function action({ params }: ActionFunctionArgs) {
  const noteId = String(params.noteId);
  const existingNotes = await getStoredNotes();
  const updatesNotes = deleteNote(existingNotes, noteId);
  await storeNotes(updatesNotes);
  return redirect("/notes");
}

export default DeletePage;
