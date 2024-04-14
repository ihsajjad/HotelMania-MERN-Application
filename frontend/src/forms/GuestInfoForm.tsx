import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/UseContexts";

interface GuestFromType {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}
const GuestInfoForm = ({ hotelId }: { hotelId: string }) => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFromType>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      childCount: search.childCount,
      adultCount: search.adultCount,
    },
  });

  const { mutate: createIntent } = useMutation(apiClient.createPaymentIntent, {
    onSuccess: (res) => {
      console.log("success", res);
      navigate(`/booking/${hotelId}`, {
        state: {
          clientSecret: res.clientSecret,
          paymentIntentId: res.paymentIntentId,
          amount: res.total,
        },
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createIntent(hotelId);
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="bg-gray-200 h-fit rounded max-w-[350px] mx-auto border border-zinc-300 shadow-lg shadow-[#00000042] p-4 md:sticky top-3">
      <span className="text-xl font-bold">$50 Per night</span>
      <form onSubmit={onSubmit} className="w-full space-y-2 mt-3">
        <DatePicker
          required
          selected={checkIn}
          onChange={(date) => setValue("checkIn", date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className=" focus:outline-none p-2 min-w-full"
          wrapperClassName="min-w-full"
        />
        <DatePicker
          required
          selected={checkOut}
          onChange={(date) => setValue("checkOut", date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className="focus:outline-none p-2 min-w-full"
          wrapperClassName="min-w-full"
        />
        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              type="number"
              className="w-full p-1 focus:outline-none font-bold"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: { value: 1, message: "There must be atleast one adult" },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              type="number"
              className="w-full p-1 focus:outline-none font-bold"
              min={0}
              max={20}
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        <button className="custom-btn w-full">Book Now</button>
      </form>
    </div>
  );
};

export default GuestInfoForm;
