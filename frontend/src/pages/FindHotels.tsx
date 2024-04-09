import { useQuery } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import HotelResultCard from "../components/HotelResultCard";

const FindHotels = () => {
  const { data, isLoading } = useQuery(
    "fetchAllHotels",
    apiClient.fetchAllHotels,
    {
      onSuccess: () => {},
      onError: () => {},
    }
  );

  if (isLoading) return <span>Loading</span>;

  let hotels: HotelDataType[] = [];
  //   let pagination: Pagination;
  if (data) {
    hotels = data?.data;
  }

  return (
    <div className="custom-container min-h-screen">
      <div className="flex md:flex-row flex-col gap-4 py-4">
        <div className="border border-zinc-300 md:w-1/5 p-5 sticky top-2 h-fit">
          Filters
        </div>
        <div className="md:w-4/5">
          <h4 className="text-xl font-bold mb-3">
            {hotels?.length} Hotels found
          </h4>
          <div className="flex flex-col gap-4">
            {hotels?.map((hotel) => (
              <HotelResultCard hotel={hotel} key={hotel._id} />
            ))}
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center">
        <div className="join gap-2 my-4">
          {Array(data?.pagination?.pages || 0)
            .fill(undefined)
            .map((_, i) => {
              const value = i + 1;
              return (
                <button
                  key={value}
                  className={`h-8 w-8 text-lg flex-center font-bold rounded ${data?.pagination?.page === value ? "bg-[var(--main-color)] text-white" : "bg-slate-300 "}`}
                >
                  {value}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FindHotels;
