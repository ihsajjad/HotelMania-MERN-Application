import { useFormContext } from "react-hook-form";
import { HotelDataType } from "../../shared/Types";
import { showInputError } from "../../shared/utils";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelDataType>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex flex-row gap-3 md:p-6 p-3 bg-gray-300">
        <label className="flex-1 text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal"
            min={1}
            {...register("adultCount", { required: true })}
          />
          {errors.adultCount && showInputError()}
        </label>
        <label className="flex-1 text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className="border rounded w-full py-2 px-3 font-normal"
            min={0}
            {...register("childCount", { required: "This field is required!" })}
          />
          {errors.childCount && showInputError()}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
