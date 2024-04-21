import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingCard from "./BookingCard";
import EmptyMsgContainer from "./EmptyMsgContainer";
import BookingSkeleton from "./skeletons/BookingSkeleton";

const CurrentBookingsPartner = () => {
  const { data: bookings, isLoading } = useQuery(
    "fetchCurrentBookingsPartner",
    apiClient.fetchCurrentBookingsPartner
  );

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold mb-3">Your Current Bookings</h3>
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <>
            <BookingSkeleton />
            <BookingSkeleton />
            <BookingSkeleton />
          </>
        ) : bookings?.length ? (
          bookings?.map((booking) => (
            <BookingCard booking={booking} key={booking._id} />
          ))
        ) : (
          <EmptyMsgContainer>
            <span className="text-xl font-bold">
              You don&apos;t have any active bookings
            </span>
          </EmptyMsgContainer>
        )}
      </div>
    </div>
  );
};

export default CurrentBookingsPartner;
