import { useQuery } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import HotelResultCard from "../components/HotelResultCard";

const FindHotels = () => {
  const { data } = useQuery("fetchAllHotels", apiClient.fetchAllHotels, {
    onSuccess: () => {},
    onError: () => {},
  });

  let hotels: HotelDataType[] = [];

  if (data) hotels = data?.data;

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
            {hotels?.map((hotel) => <HotelResultCard hotel={hotel} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHotels;
