import { Link } from "react-router-dom";
import {
  BookingType,
  HotelDataType,
} from "../../../../backend/src/shared/types";

interface Props {
  booking: BookingType;
  i: number;
}

const BookingsTableItem = ({ booking, i }: Props) => {
  const status = new Date() > new Date(booking?.checkOut) ? "Ended" : "Active";

  const hotel = booking.hotel as HotelDataType;
  return (
    <tr className="hover ">
      <th>{i + 1}</th>
      <td>{hotel?.name}</td>
      <td>{new Date(booking?.checkIn)?.toDateString()}</td>
      <td>{new Date(booking?.checkOut)?.toDateString()}</td>
      <td>{booking?.numberOfNights}</td>
      <td>${booking?.total}</td>
      <td>
        <span
          className={`${status === "Active" ? "bg-green-400" : "bg-red-400"} inline-block w-[82px] font-semibold text-white text-xs py-1 px-2 rounded`}
        >
          {status}
        </span>
      </td>
      <td className="flex justify-center py-6">
        <Link
          to={`/details/${hotel?._id}`}
          className="custom-btn w-[100px]  font-semibold"
        >
          View Hotel
        </Link>
      </td>
    </tr>
  );
};

export default BookingsTableItem;
