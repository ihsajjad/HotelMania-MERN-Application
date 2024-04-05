import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/UseContexts";

interface NavItemType {
  label: string;
  link: string;
  icon: React.ReactElement;
}
const LeftSideBar = () => {
  const { isLogin, user, logOut } = useAppContext() || {};

  let navLinks: NavItemType[] = [];

  if (user.role === "User") {
    navLinks = [
      { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
      {
        label: "My Bookings",
        link: "/dashboard/my-bookings",
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  } else if (user.role === "Admin") {
    navLinks = [
      { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
      {
        label: "Partners",
        link: "/dashboard/partners",
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  } else if (user.role === "Hotel") {
    navLinks = [
      { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
      {
        label: "My Hotels",
        link: "/dashboard/my-hotels",
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  }
  return (
    <div className="drawer-side shadow-2xl shadow-[#000000af]">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu h-full bg-[var(--bg-color)] flex flex-col">
        <h3 className="text-2xl font-bold p-2  text-[var(--main-color)] ">
          Hotel Mania
        </h3>
        <hr />
        <ul className=" p-4 w-60 text-white bg-[var(--bg-color)] flex-grow">
          {navLinks &&
            navLinks.map((item) => (
              <li key={item.link}>
                <Link to={item.link}>{item.label}</Link>
              </li>
            ))}
        </ul>
        {isLogin && (
          <button onClick={() => logOut()} className="custom-btn-outline">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
