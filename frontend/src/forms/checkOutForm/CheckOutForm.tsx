import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useAppContext } from "../../contexts/UseContexts";
import { PaymentIntentResType } from "../../shared/Types";

interface Props {
  paymentIntent: PaymentIntentResType;
}

const CheckOutForm = ({ paymentIntent }: Props) => {
  const { user } = useAppContext();
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await elements.submit();

    if (error) {
      console.log(error);
      return;
    }
    setLoading(true);
    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret: paymentIntent.clientSecret,
      confirmParams: {
        return_url: import.meta.env.VITE_FRONTEND_URL,
      },
    });

    if (error) {
      console.log(paymentError);
    }
    setLoading(false);
  };
  console.log(user);
  return (
    <form onSubmit={onSubmit} className="border rounded-md border-zinc-300">
      <h3 className="text-2xl font-bold text-center bg-slate-300 py-2 rounded-t-md">
        Confirm Your Booking
      </h3>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <label>
            Name:
            <input
              type="text"
              value={user.name}
              readOnly
              className="border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
          <label>
            Email:{" "}
            <input
              type="text"
              value={user.email}
              readOnly
              className="border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
        </div>
        <div className="bg-slate-200 text-center py-2 rounded">
          <span className="text-3xl font-bold text-slate-600">
            Total Cost: ${paymentIntent.total.toFixed(2)}
          </span>
        </div>
        <PaymentElement className="mt-3" />
        <button
          type="submit"
          disabled={!stripe && !loading}
          className="custom-btn mt-5 w-fit mx-auto"
        >
          Confirm Payment
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
