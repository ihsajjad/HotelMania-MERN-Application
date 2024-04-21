import Lottie from "lottie-react";
import { ReactNode } from "react";
import pending from "../assets/pending.json";
import Unauthorized from "../components/Unauthorized";
import { useAppContext } from "../contexts/UseContexts";

const PartnerRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext();

  if (user.role !== "Hotel") {
    return <Unauthorized />;
  }

  if (user.isVerified) {
    return children;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 h-[80vh] ">
        <Lottie animationData={pending} className="h-[40vh] w-full" />
        <h2 className="text-4xl font-semibold text-center text-slate-700 -mt-16">
          Your account is <br />
          <span className="text-[var(--main-color)] font-bold text-5xl">
            Pending
          </span>
        </h2>
        <h2 className="text-lg font-bold text-center text-slate-500 ">
          Admin will approve your account within 3 business days.
        </h2>
      </div>
    </div>
  );
};

export default PartnerRoute;
