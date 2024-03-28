import { Outlet, useLocation } from "react-router-dom";
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

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
