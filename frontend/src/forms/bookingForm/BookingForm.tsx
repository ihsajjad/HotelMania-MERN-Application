import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "../checkOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const BookingForm = () => {
  const location = useLocation();

  console.log(location.state);
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1000,
    currency: "usd",
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="flex-1">Payment Summary</div>
      <div className="flex-1 p-4">
        <Elements stripe={stripePromise} options={options}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default BookingForm;
