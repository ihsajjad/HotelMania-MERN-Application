import { ChangeEvent } from "react";

type Props = {
  sortOptions: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
const SortOptions = ({ sortOptions, onChange }: Props) => {
  return (
    <select
      onChange={onChange}
      value={sortOptions}
      className="border border-zinc-300 p-1 rounded-md text-sm"
    >
      <option value="">Sort By</option>
      <option value="Star Rating">Star Rating</option>
      <option value="price LtoH">Price Per Night (Low to High)</option>
      <option value="price HtoL">Price Per Night (High to Low)</option>
    </select>
  );
};

export default SortOptions;
