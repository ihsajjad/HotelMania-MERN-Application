const PartnerSkeleton = ({ role }: { role: string }) => {
  return (
    <div className="bg-gradient-to-r from-[var(--main-color)] bg-opacity-20 to-white border-2 border-[var(--bg-color)] sm:w-3/4 w-full rounded-lg md:px-3 px-2 pb-6 shadow-lg shadow-slate-300 relative">
      <div
        className={`py-1 md:px-3 px-2 rounded mt-3 absolute top-0 md:right-3 right-2 shadow-md shadow-[#0000004e] skeleton h-6 w-16`}
      ></div>
      <div className="flex-center flex-col gap-2">
        <img className="md:h-40 md:w-40 h-32 w-32 rounded-full md:-mt-20 -mt-16 border-2 border-[var(--bg-color)] skeleton" />
        <div className="skeleton w-40 h-6 mb-3"></div>
      </div>
      <div className="flex md:flex-row flex-col border border-[var(--second-bg-color)] rounded">
        <div className="flex-1 md:border-r md:border-b-0 border-b border-[var(--second-bg-color)]">
          <div className="skeleton w-32 h-6 mt-2 ml-2"></div>
          <div className="space-y-1 p-2">
            <div className="flex flex-row items-center justify-between gap-3 h-5">
              <div className="w-16 h-full skeleton"></div>
              <div className="w-20 h-full skeleton"></div>
            </div>
            <div className="flex flex-row items-center justify-between gap-3 h-5">
              <div className="w-16 h-full skeleton"></div>
              <div className="w-20 h-full skeleton"></div>
            </div>
            <div className="flex flex-row items-center justify-between gap-3 h-5">
              <div className="w-16 h-full skeleton"></div>
              <div className="w-20 h-full skeleton"></div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex-1">
            <div className="w-32 h-6 skeleton mt-2 ml-auto mr-2"></div>
            <div className="space-y-1 p-2">
              <div className="flex flex-row items-center justify-between gap-3 h-5">
                <div className="w-16 h-full skeleton"></div>
                <div className="w-20 h-full skeleton"></div>
              </div>
              <div className="flex flex-row items-center justify-between gap-3 h-5">
                <div className="w-16 h-full skeleton"></div>
                <div className="w-20 h-full skeleton"></div>
              </div>
              <div className="flex flex-row items-center justify-between gap-3 h-5">
                <div className="w-16 h-full skeleton"></div>
                <div className="w-20 h-full skeleton"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {role === "Admin" && (
        <div className="flex items-center justify-between mt-3 p-2 rounded border border-[var(--bg-color)]">
          <div className="py-1 px-2 rounded w-40 skeleton"></div>
          <div className="shadow-lg shadow-slate-300 w-20 h-7"></div>
        </div>
      )}
    </div>
  );
};

export default PartnerSkeleton;
