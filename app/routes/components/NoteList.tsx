type notesProps = {
  title: string;
  content: string;
  id: number;
  date: string;
};
type notesListProps = {
  notes: notesProps[];
};

const NoteList = ({ notes }: notesListProps) => {
  return (
    <ul className="flex flex-wrap justify-center list-none mt-4">
      {notes?.map((note, i) => (
        <li
          key={note?.id}
          className="w-[400px] h-[220px] bg-indigo-700 shadow-black shadow-md p-6 rounded-md text-white opacity-50 m-3"
        >
          <div className="relative">
            <div className="flex justify-between my-1">
              <span>#{i + 1}</span>
              <span>{note.date}</span>
            </div>
            <hr className="my-1" />
          </div>
          <h1 className="my-1 font-semibold text-2xl">{note.title}</h1>
          <p className="overflow-y-auto h-[100px]">{note.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
