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
    <form
      onSubmit={handleSeach}
      className="bg-slate-700 lg:-mt-10 md:-mt-16 -mt-20 xl:mx-32 lg:mx-20 md:mx-10 mx-4 max-w-screen-lg grid lg:grid-cols-[2fr_2fr_1fr_1fr_2fr] md:grid-cols-2 gap-2 p-4"
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
      <div className="flex gap-2 bg-white ">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className=" focus:outline-none p-2"
        />
      </div>
      <div className="flex gap-2 bg-white ">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className="focus:outline-none p-2"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="custom-btn flex-1">
          Search
        </button>
        <button
          onClick={handleClear}
          type="reset"
          className="custom-btn-outline flex-1"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
