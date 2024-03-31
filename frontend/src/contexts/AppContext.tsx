import { ReactNode, createContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

interface UserType {
  _id: string;
  email: string;
  profile?: string | undefined;
  role: string;
}
export type ContextType = {
  user: UserType;
  isLogin: boolean;
  isLoading: boolean;
  refetchUser: () => void;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    _id: "",
    email: "",
    profile: "",
    role: "",
  });

  const { refetch: refetchUser, isLoading } = useQuery(
    "fetchUserData",
    apiClient.fetchUserData,
    {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: (error) => {
        console.log(error);
        setUser({
          _id: "",
          email: "",
          profile: "",
          role: "",
        });
      },
      retry: false,
    }
  );

  console.log(user);
  return (
    <AppContext.Provider
      value={{ user, isLogin: !!user.email, refetchUser, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
