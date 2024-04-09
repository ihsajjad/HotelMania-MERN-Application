import { useState } from "react";
import { useQuery } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import HotelResultCard from "../components/HotelResultCard";
import { useSearchContext } from "../contexts/UseContexts";
import { SearchParams } from "../shared/Types";

const FindHotels = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>();
  const [selectedStars, setSelectedStars] = useState<string[]>();
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>();
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOptions, setSortOptions] = useState<string>("");

  const searchParams: SearchParams = {
    destination: search.destination,
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page?.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOptions,
  };

  const { data, isLoading } = useQuery(
    ["fetchAllHotels", searchParams],
    () => apiClient.fetchAllHotels(searchParams),
    {
      onSuccess: () => {},
      onError: () => {},
    }
  );

  if (isLoading) return <span>Loading</span>;

  let hotels: HotelDataType[] = [];
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
                  onClick={(e) => setPage(parseInt(e.currentTarget.innerText))}
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
