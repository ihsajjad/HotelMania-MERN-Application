import { FaRegSadTear } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[80vh] ">
      <FaRegSadTear size={80} color="var(--main-color)" />
      <h2 className="text-4xl font-bold text-center text-slate-600">
        Unauthorized Access
      </h2>
    </div>
  );
};

export default Unauthorized;
