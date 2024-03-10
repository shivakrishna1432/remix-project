import { NavLink } from "@remix-run/react";

const MainNavigation = () => {
  return (
    <div className="py-4">
      <nav>
        <ul className="flex justify-center gap-5 text-white">
          <li>
            <NavLink to="/" className={"[&.active]:text-orange-300"}>
              Home
            </NavLink>
          </li>
          <li className="active:text-orange-300">
            <NavLink to="/notes" className={"[&.active]:text-orange-300"}>
              My Notes
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
