import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../shared/Types";
import { showInputError } from "../../shared/utils";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col md:gap-4 gap-2">
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          {...register("name", { required: true })}
          name="name"
        />
        {errors.name && showInputError()}
      </label>

      <div className="flex md:flex-row flex-col md:gap-4 gap-2">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full p-2 font-normal"
            {...register("city", { required: true })}
          />
          {errors.city && showInputError()}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full p-2 font-normal"
            {...register("country", { required: true })}
          />
          {errors.country && showInputError()}
        </label>
      </div>

      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full p-2 font-normal"
          {...register("description", { required: true })}
        />
        {errors.description && showInputError()}
      </label>

      <div className="flex md:flex-row flex-col md:gap-4 gap-2 md:items-center">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Price per night
          <input
            type="number"
            className="border rounded w-full p-2 font-normal"
            {...register("pricePerNight", { required: true })}
          />
          {errors.pricePerNight && showInputError()}
        </label>

        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Star Rating
          <select
            {...register("starRating", { required: true })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && showInputError()}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
