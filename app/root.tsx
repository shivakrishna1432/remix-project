import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "./tailwind.css";
import MainNavigation from "./components/MainNavigation";

// type errorBoundayProps = {
//   error: { message: string };
// };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-violet-500">
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

//To show any error in the page

// export function ErrorBoundary({ error }: errorBoundayProps) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//         <title>An error occurred !</title>
//       </head>
//       <body className="bg-violet-500">
//         <header>
//           <MainNavigation />
//         </header>
//         <main className="px-4 text-center">
//           <h1 className="font-bold text-3xl">An error occurred !</h1>
//           <p>{error?.message}</p>
//           <p>
//             Back to{" "}
//             <Link to="/" className="text-red-700 underline text-xl">
//               safetey!
//             </Link>
//           </p>
//         </main>
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }
