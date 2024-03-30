import { ReactNode, createContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

interface UserType {
  email: string;
  photo?: string | undefined;
  role: string;
}
export type ContextType = {
  user: UserType;
  isLogin: boolean;
  refetchUser: () => void;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    email: "",
    photo: "",
    role: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const { refetch: refetchUser } = useQuery(
    "fetchUserData",
    apiClient.fetchUserData,
    {
      onSuccess: (data) => {
        setUser(data);
        setIsLogin(!!data.email);
      },
      retry: false,
    }
  );

  console.log(user);
  return (
    <AppContext.Provider value={{ user, isLogin, refetchUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
