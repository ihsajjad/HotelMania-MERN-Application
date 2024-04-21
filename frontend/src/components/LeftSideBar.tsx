import { CgProfile } from "react-icons/cg";
import { MdOutlineBookmarkAdded, MdOutlineHotel } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { RiHotelLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
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
        icon: <MdOutlineBookmarkAdded />,
      },
    ];
  } else if (user.role === "Admin") {
    navLinks = [
      {
        label: "Partners",
        link: "/dashboard/partners",
        icon: <PiUsersThreeBold />,
      },
      {
        label: "All Hotels",
        link: "/dashboard/all-hotels",
        icon: <MdOutlineHotel />,
      },
      {
        label: "All Bookings",
        link: "/dashboard/all-bookings",
        icon: <MdOutlineBookmarkAdded />,
      },
    ];
  } else if (user.role === "Hotel") {
    navLinks = [
      {
        label: "My Hotels",
        link: "/dashboard/my-hotels",
        icon: <RiHotelLine size={18} />,
      },
      {
        label: "My Bookings",
        link: "/dashboard/partner/my-bookings",
        icon: <MdOutlineBookmarkAdded size={18} />,
      },
      {
        label: "My Profile",
        link: `/dashboard/partners/${user?._id}`,
        icon: <CgProfile size={18} />,
      },
    ];
  }

  navLinks.unshift({
    label: "Dashboard",
    link: "/dashboard",
    icon: <RxDashboard size={16} />,
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
              <li key={item.link}>
                <Link
                  to={item.link}
                  className={`flex flex-row gap-1 items-center w-full relative overflow-hidden text-lg p-3 pl-4 ${location.pathname === item.link ? "bg-[var(--main-color)] text-black" : ""}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <div
                    className={`bg-[var(--bg-color)] h-10 w-10 -right-6 rotate-45 ${location.pathname === item.link ? "absolute" : "hidden"}`}
                  ></div>
                </Link>
              </li>
            ))}
        </ul>
        {isLogin && (
          <button onClick={() => logOut()} className="custom-btn-outline m-2">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
