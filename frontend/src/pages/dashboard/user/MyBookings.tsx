import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import BookingCard from "../../../components/BookingCard";
import PageTitle from "../../../components/PageTitle";
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
              <div className="border rounded overflow-hidden grid grid-cols-6 gap-2">
                <div className="w-full max-w-48 rounded h-36 mx-auto md:col-span-1 sm:col-span-2 col-span-6 skeleton"></div>

                <div className="flex flex-col p-2 flex-grow font-semibold text-slate-600 md:col-span-4 sm:col-span-4 col-span-6">
                  <h4 className=" skeleton w-40 h-6"></h4>
                  <div className="-mt-1 mb-2 w-40 h-4 skeleton"></div>

                  <div className="grow flex gap-6 text-xs md:text-sm">
                    <div className="space-y-1">
                      <div className="w-40 h-4 skeleton"></div>
                      <div className="w-40 h-4 skeleton"></div>
                      <div className="w-40 h-4 skeleton"></div>
                    </div>

                    <div className="space-y-1">
                      <div className="w-40 h-4 skeleton"></div>
                      <div className="w-40 h-4 skeleton"></div>
                      <div className="w-40 h-4 skeleton"></div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row items-end justify-between p-2 md:col-span-1 col-span-6">
                  <div>
                    <div className="skeleton w-20 h-8"></div>
                  </div>
                  <div className="skeleton w-20 h-8"></div>
                </div>
              </div>
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

export default MyBookings;
