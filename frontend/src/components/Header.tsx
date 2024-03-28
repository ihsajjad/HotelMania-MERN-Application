const Header = () => {
  return (
    <div>
      <div className="bg-slate-400 lg:px-32 py-5 text-white">
        <h1 className="text-5xl font-bold">Discover Your Dream Stay</h1>
        <p className="text-lg font-semibold mb-16">
          Where Comfort Meets Luxury and Every Moment Counts
        </p>
      </div>
      <div className="bg-slate-700 w-full -mt-10 lg:mx-32 max-w-screen-lg grid grid-cols-[1fr_1fr_1fr_1fr] gap-3 p-4">
        <input
          type="text"
          placeholder="Where are you going?"
          className="p-2 outline-none"
        />
        <div className="flex gap-2 bg-white ">
          <label className="flex bg-white gap-2 items-center p-2">
            Adults:
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="outline-none w-14"
            />
          </label>
          <label className="flex bg-white gap-2 items-center p-2">
            Children:
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="outline-none w-14"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label>
            <input
              type="date"
              placeholder="Check-in Date"
              className="outline-none p-2"
            />
          </label>
          <label>
            <input
              type="date"
              placeholder="Check-out Date"
              className="outline-none p-2"
            />
          </label>
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
