const HotelDetailsSkeleton = () => {
  return (
    <>
      <div>
        <div className="flex gap-2 items-center">
          <span className="skeleton w-20 h-4"></span>
          <span className="skeleton w-20 h-8"></span>
        </div>
        <h1 className="skeleton w-64 h-6 mt-2"></h1>
      </div>

      <div className="">
        <div className="lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] w-full skeleton"></div>

        <div className="grid h-32 my-4 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:gap-4 gap-2">
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
        </div>
      </div>

      {/* facilities */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-16">
        <div className="skeleton h-full w-full"></div>
        <div className="skeleton h-full w-full"></div>
        <div className="skeleton h-full w-full"></div>
        <div className="skeleton h-full w-full"></div>
      </div>

      {/* destination */}
      <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-5 ">
        <div className="skeleton h-80 w-full"></div>
        <div className="skeleton h-48 w-full"></div>
      </div>
    </>
  );
};

export default HotelDetailsSkeleton;
