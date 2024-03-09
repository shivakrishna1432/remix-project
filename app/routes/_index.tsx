import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="pt-3 text-center text-white">
      <h1 className="font-bold text-3xl m-2">
        A better way of keeping track of your notes
      </h1>
      <p className="m-4">
        Try our early beta and never loose track of your notes again!
      </p>
      <button className="bg-orange-300 text-black px-4 py-2 rounded-md pt-2 hover:opacity-80">
        <Link to="/notes">Try Now!</Link>
      </button>
    </div>
  );
}
