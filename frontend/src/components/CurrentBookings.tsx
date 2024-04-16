import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
const CurrentBookings = () => {
  const { data: bookings } = useQuery(
    "fetchCurrentBookings",
    apiClient.fetchCurrentBookings
  );
  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold mb-3">Your Current Bookings</h3>
      <div className="grid grid-cols-1 gap-4">
        {bookings?.map((booking) => {
          const hotel = booking.hotel as HotelDataType;
          return (
            <div
              key={booking._id}
              className="border rounded overflow-hidden flex  gap-2"
            >
              <div>
                <img
                  src={hotel?.images[0].image}
                  alt={hotel?.images[0].label}
                  className="w-40 h-36"
                />
              </div>
              <div className="flex flex-col pb-2 flex-grow font-semibold text-slate-600">
                <h4 className="text-xl font-bold text-slate-700">
                  {hotel?.name}
                </h4>
                <span className="-mt-1 mb-2">
                  {hotel.city}, {hotel.country}
                </span>

                <div className="grow flex gap-6 text-sm ">
                  <div className="space-y-1">
                    <div>
                      <span>Booked At : </span>
                      {new Date(booking.bookedAt as Date).toDateString()}
                    </div>
                    <div>
                      <span>Check In : </span>
                      <span>{new Date(booking.checkIn).toDateString()}</span>
                    </div>
                    <div>
                      <span>Check Out : </span>
                      <span>{new Date(booking.checkOut).toDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span>Number of Nights : </span>
                      {booking.numberOfNights}
                    </div>
                    <div>
                      <span>Price : </span>${hotel.pricePerNight}
                    </div>
                    <div>
                      <span>Total Paid : </span>${booking.total}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between p-2">
                <span className="border border-zinc-300 rounded-full py-0.5 px-2 w-fit">
                  {hotel.type}
                </span>

                <div>
                  <div className="flex justify-center mb-1">
                    {Array.from({ length: hotel?.starRating || 0 }).map(
                      (_, i) => (
                        <AiFillStar key={i} className="fill-yellow-400" />
                      )
                    )}
                  </div>

                  <Link
                    to={`/details/${hotel._id}`}
                    className="custom-btn w-fit"
                  >
                    View Hotel
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentBookings;
