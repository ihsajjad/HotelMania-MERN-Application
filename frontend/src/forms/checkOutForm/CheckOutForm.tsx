import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-client";

const CheckOutForm = () => {
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;
  const { hotelId } = useParams();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await elements.submit();

    if (error) {
      console.log(error);
      return;
    }

    const { clientSecret } = await apiClient.createPaymentIntent(
      hotelId as string
    );

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: import.meta.env.VITE_FRONTEND_URL,
      },
    });

    if (error) {
      console.log(paymentError);
    }
  };

  return (
    <form onSubmit={onSubmit} className="border p-3 rounded border-zinc-300">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="custom-btn mt-5 w-fit mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default CheckOutForm;
