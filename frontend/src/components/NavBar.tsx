import { FaBars, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  const options = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` ${isActive ? "active-item" : ""} nav-item`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            ` ${isActive ? "active-item" : ""} nav-item`
          }
        >
          Find Hotel
        </NavLink>
      </li>
    </>
  );

  const user = true;
  return (
    <div className="navbar bg-slate-800 text-base-100 custom-container">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>
          <ul
            tabIndex={0}
            className="text-black menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {options}
          </ul>
        </div>
        {/* text-main */}
        <Link to="/" className="text-[var(--main-color)] text-xl font-bold">
          Hotel<span>Mania</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* menu */}
        <ul className="space-x-4 menu-horizontal px-1">{options}</ul>
      </div>

      <div className="navbar-end">
        <div className="flex space-x-4 items-center">
          <Link to="" className="indicator">
            <FaShoppingCart className="text-2xl" />
            <span className="badge badge-sm indicator-item text-slate-700 font-bold bg-slate-300">
              8
            </span>
          </Link>
          {user ? (
            <button onClick={() => {}}>Logout</button>
          ) : (
            <Link to="/login" className="font-bold">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
