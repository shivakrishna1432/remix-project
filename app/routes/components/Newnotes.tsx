const NewNotes = () => {
  return (
    <div className="text-center pt-6">
      <form
        className="w-[400px] bg-white mx-auto opacity-50 rounded-md p-4 shadow-black shadow-md"
        method="post"
      >
        <div className="m-3">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <br />
          <input
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
            className="border border-black rounded-md outline-none text-sm w-[300px] p-2"
            placeholder="Enter your content here"
            name="content"
            required
          ></textarea>
        </div>
        <div className="m-3">
          <button className="bg-blue-600 text-white px-2 py-1 rounded-md hover:opacity-80">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNotes;
