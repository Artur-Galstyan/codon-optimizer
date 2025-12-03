import { Outlet } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { FaGithubSquare } from "react-icons/fa";
export default function BaseLayout() {
  return (
    <main className="w-[80%] md:w-[60%] mx-auto my-20">
      <nav className="my-8 flex justify-between">
        <ul className="flex space-x-4 my-auto">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/codon">Codon Optimizer</a>
          </li>
          <li>
            <a href="/code">Code</a>
          </li>
          <li>
            <a href="https://notes.arturgalstyan.dev">My Blog/Notes</a>
          </li>
        </ul>

        <FaGithubSquare
          size={"3rem"}
          className="cursor-pointer"
          onClick={() => {
            window.location.href =
              "https://github.com/Artur-Galstyan/codon-optimizer";
          }}
        />
      </nav>
      <div className="text-justify">
        <Outlet />
      </div>
      <Analytics />
    </main>
  );
}
