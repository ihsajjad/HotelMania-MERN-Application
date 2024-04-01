const Header = () => {
  return (
    <div>
      <div className="bg-slate-400 custom-container py-5 text-white">
        <h1 className="text-5xl font-bold">Discover Your Dream Stay</h1>
        <p className="text-lg font-semibold mb-16">
          Where Comfort Meets Luxury and Every Moment Counts
        </p>
      </div>
      <div className="bg-slate-700 -mt-10 xl:mx-32 lg:mx-20 max-w-screen-lg grid lg:grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[2fr_2fr] gap-3 p-4">
        <input
          type="text"
          placeholder="Where are you going?"
          className="p-2 outline-none"
        />
        <div className="flex gap-2 bg-white ">
          <label className="flex-1 flex bg-white gap-2 items-center p-2">
            Adults:
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="outline-none w-8"
            />
          </label>
          <label className="flex-1 flex bg-white gap-2 items-center p-2">
            Children:
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="outline-none w-8"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label className="flex-1">
            <input
              type="date"
              placeholder="Check-in Date"
              className="outline-none p-2 w-full"
            />
          </label>
          <label className="flex-1">
            <input
              type="date"
              placeholder="Check-out Date"
              className="outline-none p-2 w-full"
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
