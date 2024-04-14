import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm";
const HotelDetails = () => {
  const [currImage, setCurrImage] = useState<{
    image: string;
    label: string;
  }>();
  const { id } = useParams();

  const { data: hotel } = useQuery(
    "fetchSingleHotel",
    () => apiClient.fetchSingleHotel(id as string),
    { enabled: !!id, retry: false, refetchInterval: false }
  );

  useEffect(() => {
    setCurrImage(hotel?.images[0]);
  }, [hotel?.images]);

  const descriptions = hotel?.description?.split("\n");

  return (
    <div className="custom-container space-y-6 my-6">
      <div>
        <div className="flex gap-2 items-center">
          <span className="flex">
            {Array.from({ length: hotel?.starRating || 0 }).map((_, i) => (
              <AiFillStar className="fill-yellow-400" key={i} />
            ))}
          </span>
          <span className="border border-zinc-300 rounded-full py-1 px-2 md:text-lg text-xs">
            {hotel?.type}
          </span>
        </div>
        <h1 className="text-3xl font-bold">{hotel?.name}</h1>
      </div>

      <div className="">
        <div className="relative">
          <img
            src={currImage?.image}
            alt={currImage?.label}
            className="lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] w-full mb-4 rounded"
          />
          <span className="md:text-3xl text-xl font-bold absolute bottom-0 right-0 z-10 text-[var(--main-color)] p-2 bg-black bg-opacity-40 rounded-t-md">
            {currImage?.label}
          </span>
        </div>

        <div className="grid  md:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:gap-4 gap-2">
          {hotel?.images.map((item) => (
            <img
              key={item.image}
              src={item.image}
              alt={item.label}
              className={`${currImage?.image === item.image ? "border-[var(--main-color)]" : "opacity-60"} hover:border-[var(--main-color)] hover:opacity-100 border-4 cursor-pointer rounded duration-150 h-full`}
              onClick={() => setCurrImage(item)}
            />
          ))}
        </div>
      </div>

      {/* facilities */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {hotel?.facilities.map((facility) => (
          <span key={facility} className="border border-zinc-300 p-2">
            {facility}
          </span>
        ))}
      </div>

      {/* destination */}
      <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-5 ">
        <div className="space-y-4 text-justify text-slate-600 border border-zinc-300 p-3 rounded">
          {Array.isArray(descriptions) ? (
            descriptions?.map((description, i) => <p key={i}>{description}</p>)
          ) : (
            <p>{hotel?.description}</p>
          )}
        </div>
        <GuestInfoForm
          hotelId={id as string}
          price={hotel?.pricePerNight as number}
        />
      </div>
    </div>
  );
};

export default HotelDetails;
