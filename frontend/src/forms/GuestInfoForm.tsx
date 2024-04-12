import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../contexts/UseContexts";

interface GuestFromType {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}
const GuestInfoForm = () => {
  const search = useSearchContext();

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<GuestFromType>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      childCount: search.childCount,
      adultCount: search.adultCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="bg-gray-200 border border-zinc-300 shadow-lg shadow-[#0000006a] p-4">
      <span className="text-xl font-bold mb-3">$50 Per night</span>
      <form className="w-full space-y-2">
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
          className="focus:outline-none p-2 mi-w-full"
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
