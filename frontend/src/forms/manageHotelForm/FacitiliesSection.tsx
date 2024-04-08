import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/config.hotel-option";
import { HotelDataType } from "../../shared/Types";
import { showInputError } from "../../shared/utils";

const FacitiliesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelDataType>();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Facilities</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 ">
        {hotelFacilities.map((facility) => {
          return (
            <label className="text-sm flex gap-1 text-gray-700" key={facility}>
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) return true;
                    else return "At least one facility is required!";
                  },
                })}
              />
              {facility}
            </label>
          );
        })}
      </div>
      {errors.facilities && showInputError(errors.facilities.message as string)}
    </div>
  );
};

export default FacitiliesSection;
