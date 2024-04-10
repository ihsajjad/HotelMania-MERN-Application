import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import FilterByFacilities from "../components/FilterByFacilities";
import FilterByMaxPrice from "../components/FilterByMaxPrice";
import FilterByRating from "../components/FilterByRating";
import FilterByTypes from "../components/FilterByTypes";
import HotelResultCard from "../components/HotelResultCard";
import SortOptions from "../components/SortOptions";
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
    apiClient.fetchAllHotels(searchParams)
  );

  if (isLoading) return <span>Loading</span>;

  let hotels: HotelDataType[] = [];
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
        <div className="border border-zinc-300 md:w-1/5 p-4 sticky top-2 h-fit rounded md:block hidden">
          <h3 className="text-xl font-bold border-b border-zinc-300 pb-4 mb-4">
            Filter By :
          </h3>
          <div className="flex flex-col gap-4 text-sm">
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
            </h4>
            <SortOptions
              sortOptions={sortOptions}
              onChange={(e) => setSortOptions(e.target.value)}
            />
          </div>
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
