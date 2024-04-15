import { useQuery } from "react-query";
import * as apiClient from "../api-client";
const CurrentBookings = () => {
  const { data: bookings } = useQuery(
    "fetchCurrentBookings",
    apiClient.fetchCurrentBookings
  );
  return <div>{bookings?.length}</div>;
};

export default CurrentBookings;
