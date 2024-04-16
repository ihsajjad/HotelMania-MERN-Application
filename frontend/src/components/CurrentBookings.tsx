import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingCard from "./BookingCard";
const CurrentBookings = () => {
  const { data: bookings } = useQuery(
    "fetchCurrentBookings",
    apiClient.fetchCurrentBookings
  );
  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold mb-3">Your Current Bookings</h3>
      <div className="grid grid-cols-1 gap-4">
        {bookings &&
          bookings?.map((booking) => (
            <BookingCard booking={booking} key={booking._id} />
          ))}
      </div>
    </div>
  );
};

export default CurrentBookings;
