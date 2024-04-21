const MyHotelCardSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col w-full p-4 rounded border border-zinc-300 shadow-lg shadow-slate-300">
      <div className="skeleton w-60 h-6"></div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:h-[250px] h-[100px] w-full skeleton flex-1 rounded"></div>

        <div className="flex-1 rounded p-4 border flex flex-col">
          <div className="flex-grow skeleton rounded md:h-auto h-40"></div>
          <div className="grid md:grid-cols-[1fr_1fr] sm:grid-cols-2 grid-cols-1 gap-2 mt-4">
            <div className="border rounded-sm gap-1 skeleton h-10"></div>
            <div className="border rounded-sm gap-1 skeleton h-10"></div>
            <div className="border rounded-sm gap-1 skeleton h-10"></div>
            <div className="border rounded-sm gap-1 skeleton h-10"></div>
          </div>
        </div>
      </div>

      <span className="flex gap-3 justify-center sm:justify-end">
        <div className="w-10 h-8 rounded skeleton"></div>
        <div className="w-10 h-8 rounded skeleton"></div>
        <div className="w-10 h-8 rounded skeleton"></div>
      </span>
    </div>
  );
};

export default MyHotelCardSkeleton;
