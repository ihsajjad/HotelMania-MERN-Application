import { ReactNode, createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthUserType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import { LoginType } from "../pages/Login";
import { errorToast, successToast } from "../shared/utils";

// interface UserType {
//   _id: string;
//   email: string;
//   profile?: string | undefined;
//   role: string;
//   isVerified?: boolean;
// }
export type ContextType = {
  user: AuthUserType;
  isLogin: boolean;
  isLoading: boolean;
  logOut: () => void;
  loginUser: (data: LoginType) => void;
  refetchUser: () => void;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType>({
    _id: "",
    email: "",
    profile: "",
    role: "",
  });

  // todo: fix the unnecessary fetching
  const { refetch: refetchUser, isLoading } = useQuery(
    "fetchUserData",
    apiClient.fetchMe,
    {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
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

  const { mutate: loginUser } = useMutation(apiClient.userLogin, {
    onSuccess: (data) => {
      setUser(data);
      successToast("Login successful");
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  return (
    <AppContext.Provider
      value={{
        user,
        isLogin: !!user.email,
        refetchUser,
        isLoading,
        logOut,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
