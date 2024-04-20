import { ChangeEvent } from "react";
import { hotelTypes } from "../../config/config.hotel-option";

type Props = {
  selectedTypes: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const FilterByTypes = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-zinc-300 pb-4 h-fit row-span-2">
      <h3 className="text-lg font-bold mb-2">Types</h3>
      <div className="flex flex-col gap-1">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              value={type}
              onChange={onChange}
              checked={selectedTypes?.includes(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByTypes;
