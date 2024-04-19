import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const useGetHotelById = (id: string) => {
  const result = useQuery(
    "fetchSingleHotel",
    () => apiClient.fetchSingleHotel(id),
    {
      enabled: !!id,
      retry: false,
      refetchInterval: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return result;
};

export { useGetHotelById };
