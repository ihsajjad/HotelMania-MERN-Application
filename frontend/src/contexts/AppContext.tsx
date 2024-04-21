import { Stripe, loadStripe } from "@stripe/stripe-js";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { AuthUserType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import { successToast } from "../shared/utils";

export type ContextType = {
  user: AuthUserType;
  setUser: Dispatch<SetStateAction<AuthUserType>>;
  isLogin: boolean;
  isLoading?: boolean;
  logOut: () => void;
  refetchUser?: () => void;
  stripePromise: Promise<Stripe | null>;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const AppContext = createContext<ContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType>({
    _id: "",
    email: "",
    profile: "",
    role: "",
    name: "",
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
          name: "",
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
        name: "",
      });
    },
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLogin: !!user.email,
        refetchUser,
        isLoading,
        logOut,
        stripePromise,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
