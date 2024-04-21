import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import BookingCard from "../../../components/BookingCard";
import PageTitle from "../../../components/PageTitle";
import BookingSkeleton from "../../../components/skeletons/BookingSkeleton";

const PartnerBookings = () => {
  const { data: bookings, isLoading } = useQuery(
    "fetchPartnerBookings",
    apiClient.fetchPartnerBookings
  );
  return (
    <div>
      <PageTitle title="My Bookings" />
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-3">
          You have got {bookings?.length} bookings
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <>
              <BookingSkeleton />
              <BookingSkeleton />
              <BookingSkeleton />
            </>
          ) : (
            bookings &&
            bookings?.map((booking) => (
              <BookingCard booking={booking} key={booking._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerBookings;
