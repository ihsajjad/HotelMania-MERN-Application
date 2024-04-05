import { ReactNode, createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { successToast } from "../shared/utils";

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
  logOut: () => void;
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

  // todo: fix the unnecessary fetching
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

  const { mutate: logOut } = useMutation("logoutUser", apiClient.logoutUser, {
    onSuccess: () => {
      successToast("Logout successful");
      setUser({
        _id: "",
        email: "",
        profile: "",
        role: "",
      });
    },
  });

  return (
    <AppContext.Provider
      value={{ user, isLogin: !!user.email, refetchUser, isLoading, logOut }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
