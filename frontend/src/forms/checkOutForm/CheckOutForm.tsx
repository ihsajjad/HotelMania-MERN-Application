import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { PaymentIntentResType } from "../../shared/Types";

interface Props {
  paymentIntent: PaymentIntentResType;
}

const CheckOutForm = ({ paymentIntent }: Props) => {
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

  return (
    <form onSubmit={onSubmit} className="border p-3 rounded border-zinc-300">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe && !loading}
        className="custom-btn mt-5 w-fit mx-auto"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
