import { ReactNode, createContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

interface UserType {
  email: string;
  photo?: string | undefined;
  role: string;
}
export type ContextType = {
  value: {
    user: UserType;
    isLogin: boolean;
  };
};

export const AppContext = createContext<ContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    email: "",
    photo: "",
    role: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useQuery("fetchUserData", apiClient.fetchUserData, {
    onSuccess: (data) => {
      setUser(data);
      setIsLogin(!!data.email);
    },
  });

  const value = {
    user,
    isLogin,
  };

  return (
    <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
