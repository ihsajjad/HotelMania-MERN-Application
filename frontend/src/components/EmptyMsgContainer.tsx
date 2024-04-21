import { ReactNode } from "react";

const EmptyMsgContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-[60vh] text-slate-500">
      {children}
    </div>
  );
};

export default EmptyMsgContainer;
