import { HotelDataType } from "../../../backend/src/shared/types";

type Props = {
  numberOfNights: number;
  hotel: HotelDataType;
};

const checkIn = new Date(sessionStorage.getItem("checkIn") as string);
const checkOut = new Date(sessionStorage.getItem("checkOut") as string);
const adultCount = sessionStorage.getItem("adultCount");
const childCount = sessionStorage.getItem("childCount");

const BookingSummary = ({ numberOfNights, hotel }: Props) => {
  console.log(hotel);
  return (
    <div className="flex-1 rounded-lg border border-slate-300 h-fit">
      <h2 className="text-xl font-bold border-b p-3">Your Booking Details</h2>

      <div className="p-3">
        <div className="border-b py-3">
          Hotel Name: <span className="font-bold">{hotel?.name}</span>
        </div>
        <div className="border-b py-3">
          Location:
          <span className="font-bold">{` ${hotel?.city}, ${hotel?.country}`}</span>
        </div>
        <div className="flex justify-between py-3">
          <div>
            Check-in <div className="font-bold">{checkIn.toDateString()}</div>
          </div>
          <div>
            Check-out <div className="font-bold">{checkOut.toDateString()}</div>
          </div>
        </div>

        <div className="border-y py-3">
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
    </div>
  );
};

export default BookingSummary;
