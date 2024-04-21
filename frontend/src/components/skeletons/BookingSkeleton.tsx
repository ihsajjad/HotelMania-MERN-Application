const BookingSkeleton = () => {
  return (
    <div className="border rounded overflow-hidden grid grid-cols-6 gap-2">
      <div className="w-full max-w-48 rounded h-36 mx-auto md:col-span-1 sm:col-span-2 col-span-6 skeleton"></div>

      <div className="flex flex-col p-2 flex-grow font-semibold text-slate-600 md:col-span-4 sm:col-span-4 col-span-6">
        <div className=" skeleton w-60 h-6 mb-1"></div>
        <div className=" mb-2 w-40 h-4 skeleton"></div>

        <div className="grow flex md:gap-6 gap-2 text-xs md:text-sm">
          <div className="space-y-1">
            <div className="md:w-40 h-4 w-32 skeleton"></div>
            <div className="md:w-40 h-4 w-32 skeleton"></div>
            <div className="md:w-40 h-4 w-32 skeleton"></div>
          </div>

          <div className="space-y-1">
            <div className="md:w-40 h-4 w-32 skeleton"></div>
            <div className="md:w-40 h-4 w-32 skeleton"></div>
            <div className="md:w-40 h-4 w-32 skeleton"></div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col flex-row items-end justify-between p-2 md:col-span-1 col-span-6">
        <div>
          <div className="skeleton w-20 h-8"></div>
        </div>
        <div className="skeleton w-20 h-8"></div>
      </div>
    </div>
  );
};

export default BookingSkeleton;
