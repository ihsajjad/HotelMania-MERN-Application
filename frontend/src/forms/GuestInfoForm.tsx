import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext, useSearchContext } from "../contexts/UseContexts";
import { showInputError } from "../shared/utils";

interface GuestFromType {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}
const GuestInfoForm = ({
  hotelId,
  price,
}: {
  hotelId: string;
  price: number;
}) => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const { isLogin } = useAppContext();
  // const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<GuestFromType>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      childCount: search.childCount,
      adultCount: search.adultCount,
    },
  });

  const onSignInClick = handleSubmit((data: GuestFromType) => {
    search.saveSearchValues(
      "",
      data.adultCount,
      data.childCount,
      data.checkIn,
      data.checkOut
    );

    navigate(`/login`, { state: { from: location.pathname } });
  });

  const onSubmit = handleSubmit(async (data: GuestFromType) => {
    search.saveSearchValues(
      "",
      data.adultCount,
      data.childCount,
      data.checkIn,
      data.checkOut
    );

    const remainTimeInMS = data.checkOut.getTime() - data.checkIn.getTime();
    const dayInMiliseconds = 1000 * 60 * 60 * 24;
    const numberOfNights = Math.abs(remainTimeInMS / dayInMiliseconds);

    if (Math.ceil(numberOfNights) < 1) {
      setError("checkOut", { message: "Extend check out date" });
      return;
    }

    const paymentIntent = await apiClient.createPaymentIntent(
      hotelId,
      Math.ceil(numberOfNights)
    );

    navigate(`/hotel/${hotelId}/booking`, {
      state: { paymentIntent, numberOfNights },
    });
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="bg-gray-200 h-fit rounded max-w-[350px] mx-auto border border-zinc-300 shadow-lg shadow-[#00000042] p-4 md:sticky top-3">
      <span className="text-xl font-bold">${price} Per night</span>
      <form
        onSubmit={isLogin ? onSubmit : onSignInClick}
        className="w-full space-y-2 mt-3"
      >
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
          wrapperClassName="min-w-full "
        />
        <DatePicker
          required
          selected={checkOut}
          onChange={(date) => [
            setValue("checkOut", date as Date),
            clearErrors("checkOut"),
          ]}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className="focus:outline-none p-2 min-w-full"
          wrapperClassName="min-w-full"
        />
        {errors.checkOut && showInputError(errors.checkOut.message as string)}
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
        <button className="custom-btn w-full">
          {isLogin ? "Book Now" : "Sign In to Book"}
        </button>
      </form>
    </div>
  );
};

export default GuestInfoForm;
