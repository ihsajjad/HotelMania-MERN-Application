import Lottie from "lottie-react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import loadingAnimation from "../assets/loading-animation.json";
import { useAppContext } from "../contexts/UseContexts";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isLoading, isLogin } = useAppContext() || {};

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} className="h-[40vh] w-full" />
      </div>
    );
  }

  if (isLogin) return children;

  return (
    <Navigate to="/login" replace={true} state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
