import { ChangeEvent } from "react";

type Props = {
  selectedStars: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const FilterByRating = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-zinc-300 pb-4 h-fit">
      <h3 className="text-lg font-bold mb-2">Rating</h3>
      <div className="flex flex-col gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              value={star}
              onChange={onChange}
              checked={selectedStars?.includes(star.toString())}
            />
            <span>{star} Stars</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;
