import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
const HotelDetails = () => {
  const { id } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchSingleHotel",
    () => apiClient.fetchSingleHotel(id as string),
    { enabled: !!id, retry: false, refetchInterval: false }
  );

  console.log(hotel);

  return <div>{hotel?.name}</div>;
};

export default HotelDetails;
