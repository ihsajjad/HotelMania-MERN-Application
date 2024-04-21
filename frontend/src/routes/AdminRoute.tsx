import { ReactNode } from "react";
import Unauthorized from "../components/Unauthorized";
import { useAppContext } from "../contexts/UseContexts";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext();

  if (user.role === "Admin") {
    return children;
  }

  return <Unauthorized />;
};

export default AdminRoute;
