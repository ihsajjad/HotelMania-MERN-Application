import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useLocation, useParams } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";
import BookingSummary from "../components/BookingSummary";
import CheckOutForm from "../forms/checkOutForm/CheckOutForm";
import { useGetHotelById } from "../shared/CommonHooks";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);
const Booking = () => {
  const location = useLocation();
  const { paymentIntent, numberOfNights } = location.state;
  const { hotelId } = useParams();

  const { data: hotel } = useGetHotelById(hotelId as string);

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent?.clientSecret,
  };

  return (
    <div className="custom-container my-10 flex md:flex-row flex-col gap-5">
      <BookingSummary
        hotel={hotel as HotelDataType}
        numberOfNights={numberOfNights}
      />
      <div className="flex-1 rounded">
        {paymentIntent && (
          <Elements stripe={stripePromise} options={options}>
            <CheckOutForm
              paymentIntent={paymentIntent}
              numberOfNights={numberOfNights}
              hotelId={hotelId as string}
              hotelOwner={hotel?.userId as string}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Booking;
