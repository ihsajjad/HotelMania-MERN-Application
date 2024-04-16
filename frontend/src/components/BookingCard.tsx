import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BookingType, HotelDataType } from "../../../backend/src/shared/types";

const BookingCard = ({ booking }: { booking: BookingType }) => {
  const hotel = booking?.hotel as HotelDataType;
  return (
    <div
      key={booking._id}
      className="border rounded overflow-hidden grid grid-cols-6 gap-2 "
    >
      <img
        src={hotel?.images[0]?.image}
        alt={hotel?.images[0]?.label}
        className="w-full max-w-48 rounded h-36 mx-auto md:col-span-1 sm:col-span-2 col-span-6"
      />

      <div className="flex flex-col p-2 flex-grow font-semibold text-slate-600 md:col-span-4 sm:col-span-4 col-span-6">
        <h4 className="text-xl font-bold text-slate-700">{hotel?.name}</h4>
        <span className="-mt-1 mb-2">
          {hotel?.city}, {hotel?.country}
        </span>

        <div className="grow flex gap-6 text-xs md:text-sm">
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
              <span>Price : </span>${hotel?.pricePerNight}
            </div>
            <div>
              <span>Total Paid : </span>${booking.total}
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col flex-row items-end justify-between p-2 md:col-span-1 col-span-6">
        <div>
          <span className="border border-zinc-300 rounded-full py-0.5 px-2 w-fit">
            {hotel?.type}
          </span>
          <div className="flex justify-center mt-1">
            {Array.from({ length: hotel?.starRating || 0 }).map((_, i) => (
              <AiFillStar key={i} className="fill-yellow-400" />
            ))}
          </div>
        </div>
        <Link to={`/details/${hotel?._id}`} className="custom-btn w-fit">
          View Hotel
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;
