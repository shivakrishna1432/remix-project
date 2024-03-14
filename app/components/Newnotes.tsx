import { Form, useActionData, useNavigation } from "@remix-run/react";
import { action } from "~/routes/notes._index";

const NewNotes = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  type itemProps = {
    message: string;
    path: string[];
  };
  return (
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
            type="text"
            className="border border-black rounded-md outline-none px-2 py-1 text-sm w-[300px]"
            placeholder="Enter your title here"
            name="title"
            required
          />
          <div>
            {actionData &&
              actionData?.error?.issues.map((item: itemProps, i: number) => {
                if (item.path[0] === "title") {
                  return (
                    <>
                      <p key={i}>{item.message}</p>
                    </>
                  );
                }
              })}
          </div>
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
          <div>
            {actionData &&
              actionData?.error?.issues.map((item: itemProps, i: number) => {
                if (item.path[0] === "content") {
                  return (
                    <>
                      <p key={i}>{item.message}</p>
                    </>
                  );
                }
              })}
          </div>
          <div>
            {/* {actionData && <p>{actionData?.error?.issues[1].message}</p>} */}
          </div>
        </div>
        <div className="m-3">
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded-md hover:opacity-80"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Note"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewNotes;
