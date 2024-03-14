import type { MetaFunction } from "@remix-run/node";
import { getStoredNotes, notesLength, storeNotes } from "~/data/notes";
import { ActionFunction, json, redirect } from "@remix-run/node";
import NoteList from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { formatedDate } from "../helper";
import * as z from "zod";
import NewNotes from "~/components/Newnotes";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type notesProps = {
  title: string;
  content: string;
  id: number;
  date: string;
};
// type errorBoundayProps = {
//   error: {
//     message: string;
//   };
// };

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
  const formSchema = z.object({
    title: z
      .string()
      .min(6, { message: "title should be at least 6 characters" })
      .max(14, { message: "title should not be more than 10 characters" }),
    content: z
      .string()
      .min(8, { message: "content must be at least 8 characters" }),
  });
  try {
    const newSub = formSchema.parse(notesData);
    console.log("formData", newSub);
  } catch (error) {
    // console.log(error);
    return json({ error });
  }
  const existingNotes = await getStoredNotes();
  notesData.id = noteLength + 1;
  const date = new Date();
  notesData.date = formatedDate(date);
  const updatedNotes = existingNotes.concat(notesData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
  // await new Promise((res, rej) => setTimeout(() => res(), 5000));
};
export default Notes;

// To show any error in the page

// export function ErrorBoundary({ error }: errorBoundayProps) {
//   <main className="px-4 text-center">
//     <h1 className="font-bold text-3xl">An error occurred !</h1>
//     <p>{error?.message}</p>
//     <p>
//       Back to{" "}
//       <Link to="/" className="text-red-700 underline text-xl">
//         safetey!
//       </Link>
//     </p>
//   </main>;
// }
