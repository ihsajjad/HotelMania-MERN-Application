import { hotelFacilities } from "../../config/config.hotel-option";

const FacitiliesSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3 ">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1 text-gray-700" key={facility}>
            <input
              type="checkbox"
              value={facility}
              // {...register("facilities", {
              //   validate: (facilities) => {
              //     if (facilities && facilities.length > 0) return true;
              //     else return "At least one facility is required!";
              //   },
              // })}
            />
            {facility}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacitiliesSection;
