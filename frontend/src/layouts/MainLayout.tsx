import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../sheared/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  console.log(location.pathname === ("/" || "/search") && "true");
  return (
    <div className="flex flex-col min-h-screen justify-between max-w-screen-xl mx-auto">
      <div>
        <NavBar />
        {location.pathname === ("/" || "/search") && <Header />}
      </div>

      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
