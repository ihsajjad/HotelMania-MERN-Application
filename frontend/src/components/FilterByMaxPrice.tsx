import { ChangeEvent } from "react";

type Props = {
  selectedPrice: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
const FilterByMaxPrice = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Select Max Price</h4>
      <div className="flex flex-col gap-1">
        <select
          onChange={onChange}
          className="border border-zinc-400 rounded p-1"
        >
          <option value="">Select Max Price</option>
          {[50, 100, 200, 300, 400, 500].map((price) => (
            <option value={price} selected={selectedPrice == price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterByMaxPrice;
