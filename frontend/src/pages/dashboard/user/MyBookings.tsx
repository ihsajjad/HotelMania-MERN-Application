import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../../../api-client";
import BookingCard from "../../../components/BookingCard";
import EmptyMsgContainer from "../../../components/EmptyMsgContainer";
import PageTitle from "../../../components/PageTitle";
import BookingSkeleton from "../../../components/skeletons/BookingSkeleton";
const MyBookings = () => {
  const { data: bookings, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  return (
    <div>
      <PageTitle title="My Bookings" />
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-3">
          You had booked {bookings?.length} hotels
        </h3>
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
                You don&apos;t have any bookings yet{" "}
                <Link
                  to="/search"
                  className="border-b-2 border-[var(--main-color)] text-[var(--main-color)]"
                >
                  Book One
                </Link>
              </span>
            </EmptyMsgContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
