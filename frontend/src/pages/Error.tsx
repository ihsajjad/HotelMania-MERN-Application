import Lottie from "lottie-react";
import { Link, useRouteError } from "react-router-dom";
import animation from "../assets/404.json";

interface RouterError extends Error {
  error: { message: string };
}
const Error: React.FC = () => {
  const errorData: RouterError = useRouteError() as RouterError;
  const { error } = errorData;

  return (
    <div className="h-screen w-screen">
      <Lottie animationData={animation} className="h-[80vh] w-full" />
      <div className="text-center">
        <p>{error?.message}</p>
        <p>
          Back to home <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
