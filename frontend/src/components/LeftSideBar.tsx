import { AiFillDashboard } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/UseContexts";

interface NavItemType {
  label: string;
  link: string;
  icon: React.ReactElement;
}
const LeftSideBar = () => {
  const { isLogin, user, logOut } = useAppContext() || {};
  const location = useLocation();

  let navLinks: NavItemType[] = [];

  if (user.role === "User") {
    navLinks = [
      {
        label: "My Bookings",
        link: "/dashboard/my-bookings",
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  } else if (user.role === "Admin") {
    navLinks = [
      {
        label: "Partners",
        link: "/dashboard/partners",
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  } else if (user.role === "Hotel") {
    navLinks = [
      {
        label: "My Hotels",
        link: "/dashboard/my-hotels",
        icon: <AiFillDashboard />,
      },
      {
        label: "My Profile",
        link: `/dashboard/partners/${user?._id}`,
        icon: <AiFillDashboard />,
      },
      //   { label: "Dashboard", link: "/dashboard", icon: <AiFillDashboard /> },
    ];
  }

  navLinks.unshift({
    label: "Dashboard",
    link: "/dashboard",
    icon: <AiFillDashboard size={23} />,
  });
  navLinks.unshift({
    label: "Dashboard One",
    link: "/dashboard1",
    icon: <AiFillDashboard size={23} />,
  });
  navLinks.unshift({
    label: "Dashboard Two",
    link: "/dashboard2",
    icon: <AiFillDashboard size={23} />,
  });
  navLinks.unshift({
    label: "Dashboard Three",
    link: "/dashboard3",
    icon: <AiFillDashboard size={23} />,
  });

  return (
    <div className="drawer-side shadow-2xl shadow-[#000000af]">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="h-full bg-[var(--bg-color)] flex flex-col p-0">
        <Link
          to="/"
          className="text-2xl font-bold p-3 text-[var(--main-color)] "
        >
          Hotel<span className="text-slate-100">Mania</span>
        </Link>
        <hr className="border-1 border-slate-400" />
        <ul className=" w-56 text-white bg-[var(--bg-color)] flex-grow">
          {navLinks &&
            navLinks.map((item) => (
              <li
                key={item.link}
                className={`flex flex-row gap-1 items-center relative overflow-hidden text-lg p-3 pl-4 ${location.pathname === item.link ? "bg-[var(--main-color)] text-black" : ""}`}
              >
                <span>{item.icon}</span>
                <Link to={item.link}>{item.label}</Link>
                <div
                  className={`bg-purple-700 h-10 w-10 -right-6 rotate-45 ${location.pathname === item.link ? "absolute" : "hidden"}`}
                ></div>
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
