import { Link } from "react-router-dom";
import { HotelDataType } from "../../../../backend/src/shared/types";

const HotelsTableItem = ({ hotel, i }: { hotel: HotelDataType; i: number }) => {
  return (
    <tr className="hover ">
      <th>{i + 1}</th>
      <td>{hotel?.name}</td>
      <td>{`${hotel.city}, ${hotel.country}`}</td>
      <td>${hotel.pricePerNight}</td>
      <td>{hotel?.type}</td>
      <td>{new Date(hotel.lastUpdated).toDateString()}</td>

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

export default HotelsTableItem;
