import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { HotelCardType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import HotelResultCard from "../components/HotelResultCard";
import SortOptions from "../components/SortOptions";
import FilterByFacilities from "../components/filters/FilterByFacilities";
import FilterByMaxPrice from "../components/filters/FilterByMaxPrice";
import FilterByRating from "../components/filters/FilterByRating";
import FilterByTypes from "../components/filters/FilterByTypes";
import HotelCardSkeleton from "../components/skeletons/HotelCardSkeleton";
import { useSearchContext } from "../contexts/UseContexts";
import { SearchParams } from "../shared/Types";

const FindHotels = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>();
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
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

  const { data, isLoading } = useQuery(["fetchAllHotels", searchParams], () =>
    apiClient.fetchSearchHotels(searchParams)
  );

  let hotels: HotelCardType[] = [];
  if (data) {
    hotels = data?.data;
  }

  const handleStarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars?.filter((star) => star !== starRating)
    );
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;

    setSelectedHotelTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, type]
        : prevTypes?.filter((prevType) => prevType !== type)
    );
  };

  const handleFacilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev?.filter((p) => p !== facility)
    );
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const maxPrice = event.target.value;
    setSelectedPrice(parseInt(maxPrice));
  };

  return (
    <div className="custom-container min-h-screen">
      <div className="flex md:flex-row flex-col gap-4 py-4">
        <div className="border border-zinc-300 md:w-1/5 p-4 md:sticky top-2 h-fit rounded">
          <h3 className="text-xl font-bold border-b border-zinc-300 pb-4 mb-4">
            Filter By :
          </h3>
          <div className="grid md:grid-cols-1 grid-cols-2 gap-4 text-sm h-40 overflow-y-scroll md:h-fit md:overflow-hidden">
            <FilterByRating
              selectedStars={selectedStars}
              onChange={handleStarChange}
            />
            <FilterByTypes
              selectedTypes={selectedHotelTypes}
              onChange={handleTypeChange}
            />
            <FilterByFacilities
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <FilterByMaxPrice
              selectedPrice={selectedPrice as number}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="md:w-4/5">
          <div className="flex md:items-center justify-between mb-4 gap-2 md:flex-row flex-col">
            <h4 className="text-xl font-bold">
              {data?.pagination?.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </h4>
            <SortOptions
              sortOptions={sortOptions}
              onChange={(e) => setSortOptions(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <>
                <HotelCardSkeleton />
                <HotelCardSkeleton />
                <HotelCardSkeleton />
                <HotelCardSkeleton />
                <HotelCardSkeleton />
              </>
            ) : (
              hotels?.map((hotel) => (
                <div className="md:h-72" key={hotel._id}>
                  <HotelResultCard hotel={hotel} key={hotel._id} />
                </div>
              ))
            )}
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
