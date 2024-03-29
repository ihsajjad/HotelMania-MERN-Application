import { useContext } from "react";
import { AppContext, ContextType } from "./AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as ContextType;
};
