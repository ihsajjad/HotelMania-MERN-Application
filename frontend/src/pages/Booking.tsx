import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useLocation, useParams } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";
import BookingSummary from "../components/BookingSummary";
import { useAppContext } from "../contexts/UseContexts";
import CheckOutForm from "../forms/checkOutForm/CheckOutForm";
import { useGetHotelById } from "../shared/CommonHooks";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const location = useLocation();
  const { paymentIntent, numberOfNights } = location.state;
  const { hotelId } = useParams();

  const { data: hotel } = useGetHotelById(hotelId as string);

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent?.clientSecret,
  };

  return (
    <div className="custom-container my-10 flex md:flex-row flex-col gap-5">
      <div className="flex-1 border border-zinc-300 rounded-md">
        <BookingSummary
          hotel={hotel as HotelDataType}
          numberOfNights={numberOfNights}
        />
      </div>
      <div className="flex-1 rounded">
        {paymentIntent && (
          <Elements stripe={stripePromise} options={options}>
            <CheckOutForm paymentIntent={paymentIntent} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Booking;
