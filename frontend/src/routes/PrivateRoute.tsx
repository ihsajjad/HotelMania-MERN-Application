import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/UseContexts";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isLoading, isLogin } = useAppContext() || {};

  if (isLoading) return <span>Loading</span>;

  if (isLogin) return children;

  return (
    <Navigate to="/login" replace={true} state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
