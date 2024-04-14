import { PaymentElement } from "@stripe/react-stripe-js";
const CheckOutForm = () => {
  return (
    <form className="border p-3 rounded border-zinc-300">
      <PaymentElement />
      <button className="custom-btn mt-5 w-fit mx-auto">Submit</button>
    </form>
  );
};

export default CheckOutForm;
