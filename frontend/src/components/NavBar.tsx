import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../contexts/UseContexts";

const NavBar = () => {
  const { isLogin, user, logOut } = useAppContext() || {};

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

  return (
    <nav className="navbar bg-[var(--bg-color)] text-base-100 custom-container">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="lg:hidden flex items-center mr-4">
            <FaBars />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-4 z-10 p-2 space-y-2 shadow bg-[var(--bg-color)] w-40"
          >
            {options}
          </ul>
        </div>
        {/* text-main */}
        <Link to="/" className="text-[var(--main-color)] text-xl font-bold">
          Hotel<span className="text-white/90">Mania</span>
          {/* <img src={logo} className="h-auto w-40" /> */}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* menu */}
        <ul className="space-x-4 menu-horizontal px-1">{options}</ul>
      </div>
      <div className="navbar-end">
        {isLogin ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-10 rounded-full ring ring-[var(--main-color)] ring-offset-[black] ring-offset-2">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${user.profile ? user.profile : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow  dropdown-content bg-[var(--bg-color)] w-40"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button
                  onClick={() => logOut()}
                  className="py-0.5 px-2 text-[var(--bg-color)] bg-[var(--main-color)] rounded font-bold text-sm mt-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/register" className="custom-btn ">
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
