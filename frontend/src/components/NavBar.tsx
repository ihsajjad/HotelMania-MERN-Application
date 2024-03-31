import { FaBars } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/UseContexts";
const NavBar = () => {
  const { isLogin, user } = useAppContext() || {};
  const { mutate: logOut } = useMutation("logoutUser", apiClient.logoutUser, {
    onSuccess: () => {
      toast.success("Logout successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    },
  });

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
                <button onClick={() => logOut()} className="custom-btn ">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="font-bold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
