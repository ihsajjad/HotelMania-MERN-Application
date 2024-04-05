import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/config.hotel-option";
import { HotelDataType } from "../../shared/Types";
import { showInputError } from "../../shared/utils";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelDataType>();

  const typeWatch = watch("type") || "";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
            key={type}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: true })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
        {errors.type && showInputError()}
      </div>
    </div>
  );
};

export default TypeSection;
