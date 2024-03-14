import { NavLink } from "@remix-run/react";

const MainNavigation = () => {
  return (
    <div className="py-4">
      <ul className="flex justify-center gap-5 text-white">
        <li>
          <NavLink to="/" className={"[&.active]:text-orange-300"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/notes" className={"[&.active]:text-orange-300"}>
            My Notes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainNavigation;
