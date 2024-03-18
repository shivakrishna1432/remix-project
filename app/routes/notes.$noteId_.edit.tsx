import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { formatedDate } from "~/helper";

const EditPage = () => {
  const note = useLoaderData<typeof loader>();
  return (
    <>
      <div className="text-center pt-6">
        <Form
          className="w-[400px] bg-white mx-auto opacity-50 rounded-md p-4 shadow-black shadow-md"
          method="post"
        >
          <div className="m-3">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <br />
            <input
              defaultValue={note.title}
              type="text"
              className="border border-black rounded-md outline-none px-2 py-1 text-sm w-[300px]"
              placeholder="Enter your title here"
              name="title"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="font-semibold">
              Content
            </label>
            <br />
            <textarea
              defaultValue={note.content}
              className="border border-black rounded-md outline-none text-sm w-[300px] p-2"
              placeholder="Enter your content here"
              name="content"
              required
            ></textarea>
          </div>
          <div className="my-3">
            <button
              className="bg-green-600 mr-4 px-5 py-1 text-white rounded-md font-bold"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-600 px-5 py-1 text-white rounded-md font-bold"
              type="submit"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
type noteProps = {
  title: string;
  content: string;
  id: string;
};

type itemProps = {
  id: string;
};

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updatedNote = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  const date = new Date();
  updatedNote.id = String(params.noteId);
  updatedNote.date = formatedDate(date);

  const existingIndex = existingNotes.findIndex(
    (item: itemProps) => item.id === updatedNote.id
  );

  existingIndex !== -1
    ? (existingNotes[existingIndex] = {
        ...existingNotes[existingIndex],
        ...updatedNote,
      })
    : existingNotes.push(updatedNote);

  //   const updatedNotes = existingNotes.concat(updatedNote);
  await storeNotes(existingNotes);
  return redirect("/notes");
}

export async function loader({ params }: LoaderFunctionArgs) {
  const allNotes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = allNotes.find((note: noteProps) => note.id === noteId);
  if (!selectedNote) {
    throw new Response("NoteId not found", { status: 404 });
  }
  return selectedNote;
}
export default EditPage;
