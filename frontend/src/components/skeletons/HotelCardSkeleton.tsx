const HotelCardSkeleton = () => {
  return (
    <div className="flex gap-4 md:flex-row flex-col w-full p-4 rounded h-full border border-zinc-300 ">
      <div className="flex-1 relative">
        <div className="rounded w-full md:h-full h-40 skeleton"></div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col space-y-2">
          <span className="skeleton w-32 h-3"></span>
          <h3 className="text-lg font-bold skeleton w-64 h-5"></h3>
          <span className="skeleton w-32 h-3"></span>
        </div>
        <div className="flex-grow">
          <p className="skeleton w-full md:h-32 h-10"></p>
        </div>

        <div className="skeleton md:block hidden w-60 h-6"></div>
        <div className="flex items-center justify-between">
          <div className="skeleton w-36 h-6"></div>
          <div className="skeleton w-28 h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
