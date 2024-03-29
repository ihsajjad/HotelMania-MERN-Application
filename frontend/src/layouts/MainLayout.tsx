import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../sheared/Footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen justify-between max-w-screen-xl mx-auto">
      <div>
        <NavBar />
        {location.pathname === ("/" || "/search") && <Header />}
      </div>
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
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
