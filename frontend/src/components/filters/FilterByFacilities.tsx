import { ChangeEvent } from "react";
import { hotelFacilities } from "../../config/config.hotel-option";

type Props = {
  selectedFacilities: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const FilterByFacilities = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-zinc-300 pb-4 h-fit row-span-2">
      <h4 className="text-lg font-bold mb-2">Facilities</h4>
      <div className="flex flex-col gap-1">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              onChange={onChange}
              checked={selectedFacilities?.includes(facility)}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByFacilities;
