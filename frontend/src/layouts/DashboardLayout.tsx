import { IoMdMenu } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LeftSideBar from "../components/LeftSideBar";
import { useAppContext } from "../contexts/UseContexts";

const DashboardLayout = () => {
  const { user } = useAppContext() || {};

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="relative bg-[var(--bg-color)] text-white flex items-center justify-center min-h-12 text-2xl font-bold">
          <label
            htmlFor="my-drawer-2"
            className="p-2 text-white drawer-button lg:hidden absolute top-1 left-1 "
          >
            <IoMdMenu size={30} />
          </label>
          {user?.role} Dashboard
        </div>

        {/* Page content here */}

        <Outlet />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <LeftSideBar />
    </div>
  );
};

export default DashboardLayout;
