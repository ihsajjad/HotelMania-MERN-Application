import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/UseContexts";
import CheckOutForm from "../forms/checkOutForm/CheckOutForm";

const Booking = () => {
  const { stripePromise } = useAppContext();

  const location = useLocation();

  const { paymentIntent } = location.state;

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent?.clientSecret,
  };

  return (
    <div className="custom-container my-10 flex md:flex-row flex-col gap-5">
      <div className="flex-1 border border-zinc-300 rounded-md">
        <h3 className="text-xl font-bold p-2">Your Booking Details</h3>
        <div></div>
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
