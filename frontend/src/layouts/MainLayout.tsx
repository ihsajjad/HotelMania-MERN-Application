import { ReactNode } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between max-w-screen-xl mx-auto">
      <div>
        <NavBar />
        <Header />
      </div>

      {children}
      <div>Footer</div>
    </div>
  );
};

export default MainLayout;
