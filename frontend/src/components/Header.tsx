import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  return (
    <div>
      <div className="bg-slate-400 custom-container py-5 text-white">
        <h1 className="text-5xl font-bold">Discover Your Dream Stay</h1>
        <p className="text-lg font-semibold mb-16">
          Where Comfort Meets Luxury and Every Moment Counts
        </p>
      </div>
      <div className="bg-slate-700 lg:-mt-10 md:-mt-16 -mt-20 xl:mx-32 lg:mx-20 md:mx-10 mx-4 max-w-screen-lg grid lg:grid-cols-[2fr_2fr_1fr_1fr_2fr] md:grid-cols-2 gap-2 p-4">
        <input
          type="text"
          placeholder="Where are you going?"
          className="p-2 outline-none w-full"
        />
        <div className="flex bg-white p-2">
          <label className="flex-1 flex gap-2 items-center">
            Adults:
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="outline-none w-8"
            />
          </label>
          <label className="flex-1 flex gap-2 items-center">
            Children:
            <input
              type="number"
              min={0}
              defaultValue={1}
              className="outline-none w-8"
            />
          </label>
        </div>
        <div className="flex gap-2 bg-white ">
          <DatePicker
            startDate={new Date()}
            endDate={new Date()}
            onChange={() => {}}
            placeholderText="Check-in date"
            className=" focus:outline-none p-2 w-fit"
          />
        </div>
        <div className="flex gap-2 bg-white ">
          <DatePicker
            startDate={new Date()}
            endDate={new Date()}
            onChange={() => {}}
            placeholderText="Check-in date"
            className=" focus:outline-none p-2"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="custom-btn flex-1">
            Search
          </button>
          <button type="reset" className="custom-btn-outline flex-1">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
