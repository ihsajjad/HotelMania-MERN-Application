import { ReactNode, createContext } from "react";
import { useQuery } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";

export type HotelsContextType = {
  topHotels: HotelDataType[];
  loadingTopHotels: boolean;
};

export const HotelsContext = createContext<HotelsContextType>({
  topHotels: [],
  loadingTopHotels: true,
});

export const HotelsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, isLoading: loadingTopHotels } = useQuery(
    "fetchTopHotels",
    apiClient.fetchTopHotels
  );

  const topHotels = data ? data : [];

  return (
    <HotelsContext.Provider value={{ topHotels, loadingTopHotels }}>
      {children}
    </HotelsContext.Provider>
  );
};
