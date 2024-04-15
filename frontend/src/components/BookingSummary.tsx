import { HotelDataType } from "../../../backend/src/shared/types";

type Props = {
  numberOfNights: number;
  hotel: HotelDataType;
};

const checkIn = sessionStorage.getItem("checkIn");
const checkOut = sessionStorage.getItem("checkOut");
const adultCount = sessionStorage.getItem("adultCount");
const childCount = sessionStorage.getItem("childCount");

const BookingSummary = ({ numberOfNights, hotel }: Props) => {
  console.log(hotel);
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:{" "}
        <span className="font-bold">
          {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in <div className="font-bold">{checkIn}</div>
        </div>
        <div>
          Check-out <div className="font-bold">{checkOut}</div>
        </div>
      </div>

      <div className="border-y py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      <div>
        Guests
        <div className="font-bold">
          {adultCount} adults & {childCount} childrens
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
