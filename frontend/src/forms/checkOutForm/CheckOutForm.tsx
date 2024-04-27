import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { BookingType } from "../../../../backend/src/shared/types";
import * as apiClient from "../../api-client";
import { useAppContext, useSearchContext } from "../../contexts/UseContexts";
import { PaymentIntentResType } from "../../shared/Types";
import { errorToast, successToast } from "../../shared/utils";

interface Props {
  paymentIntent: PaymentIntentResType;
  numberOfNights: number;
  hotelId: string;
  hotelOwner: string;
}

const CheckOutForm = ({
  paymentIntent,
  numberOfNights,
  hotelId,
  hotelOwner,
}: Props) => {
  const { user } = useAppContext();
  const search = useSearchContext();
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: saveBookingData } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      successToast("Booking successful");
    },
  });

  const bookingData: BookingType = {
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    hotelOwner,
    numberOfNights,
    hotel: hotelId,
    paymentIntentId: paymentIntent.paymentIntentId,
    total: paymentIntent.total,
    userId: user._id,
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await elements.submit();
    if (error) {
      errorToast("Something went wrong, try again later!");
      return;
    }

    setLoading(true);
    bookingData.bookedAt = new Date();
    saveBookingData(bookingData);

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret: paymentIntent.clientSecret,
      confirmParams: {
        return_url: import.meta.env.VITE_FRONTEND_URL + "/dashboard",
      },
    });

    if (paymentError) {
      errorToast("Failed to payment");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="border rounded-md border-zinc-300">
      <h3 className="text-2xl font-bold text-center bg-slate-300 py-2 rounded-t-md">
        Confirm Your Booking
      </h3>
      <div className="p-3">
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 mb-2">
          <label className="md:flex-1 w-full">
            Name:
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
          <label className="md:flex-1 w-full">
            Email:{" "}
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
        </div>
        <div className="bg-slate-200 text-center py-2 my-5 rounded">
          <span className="text-3xl font-bold text-slate-600">
            Total Cost: ${paymentIntent.total.toFixed(2)}
          </span>
        </div>
        <PaymentElement className="mt-3" />
        <div className="text-center mt-5">
          <button
            type="submit"
            disabled={!stripe && !loading}
            className="custom-btn"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
