import { ChangeEvent } from "react";

type Props = {
  selectedPrice: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
const FilterByMaxPrice = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2 h-fit">Select Max Price</h3>
      <label className="flex flex-col gap-1">
        <select
          value={selectedPrice}
          onChange={onChange}
          className="border border-zinc-400 rounded p-1"
        >
          <option value="">Select Max Price</option>
          {[50, 100, 200, 300, 400, 500].map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterByMaxPrice;
