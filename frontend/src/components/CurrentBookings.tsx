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
      <div className="flex flex-col gap-4">
        {bookings?.map((booking) => {
          const hotel = booking.hotel as HotelDataType;
          return (
            <div
              key={booking._id}
              className="border rounded overflow-hidden flex gap-2"
            >
              <div>
                <img
                  src={hotel?.images[0].image}
                  alt={hotel?.images[0].label}
                  className="w-48 h-40"
                />
              </div>
              <div className="flex flex-col pb-2">
                <h4 className="text-xl font-bold">{hotel?.name}</h4>

                <div className="grow flex gap-6 text-sm font-semibold text-slate-600">
                  <div className="space-y-2">
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

                  <div className="space-y-2">
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

                <Link to={`/details/${hotel._id}`} className="custom-btn w-fit">
                  View Hotel
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentBookings;
