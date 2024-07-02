import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/UseContexts";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkIn);

  const handleSeach = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      adultCount,
      childCount,
      checkIn,
      checkOut
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleClear = () => {
    search.clearSearchValues();

    setDestination("");
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(new Date());
    setCheckOut(new Date());
  };

  return (
    <div className="custom-container">
      <form
        onSubmit={handleSeach}
        className="bg-[var(--bg-color)] grid lg:grid-cols-4 md:grid-cols-2 gap-2 p-3"
      >
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where are you going?"
          className="p-2 outline-none w-full"
        />
        <div className="flex bg-white p-2">
          <label className="flex-1 flex gap-2 items-center">
            Adults:
            <input
              type="number"
              value={adultCount}
              onChange={(e) => setAdultCount(parseInt(e.target.value))}
              min={1}
              className="outline-none w-8"
            />
          </label>
          <label className="flex-1 flex gap-2 items-center">
            Children:
            <input
              type="number"
              value={childCount}
              onChange={(e) => setChildCount(parseInt(e.target.value))}
              min={0}
              className="outline-none w-8"
            />
          </label>
        </div>
        <div className="flex justify-between bg-white z-50">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="w-full focus:outline-none p-2"
          />

          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="w-full focus:outline-none p-2"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="py-1 px-2 text-[var(--bg-color)] bg-[var(--main-color)] font-bold flex-1"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            type="reset"
            className="py-1 px-2 border-2 text-white border-[var(--main-color)] hover:text-[var(--main-color)] flex-1"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
