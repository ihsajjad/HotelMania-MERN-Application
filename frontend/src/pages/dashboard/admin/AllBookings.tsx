import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";

const AllBookings = () => {
  const { data: bookings } = useQuery(
    "fetchAllBookings",
    apiClient.fetchAllBookings
  );

  console.log(bookings);
  return <div></div>;
};

export default AllBookings;
