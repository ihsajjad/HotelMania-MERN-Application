import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../../../api-client";
import PageTitle from "../../../components/PageTitle";
import { useAppContext } from "../../../contexts/UseContexts";
const MyHotels = () => {
  const { user } = useAppContext() || {};

  const { data: hotels } = useQuery(
    "fetchMyHotels",
    () => apiClient.fetchMyHotels(user._id),
    { enabled: !!user._id }
  );
  console.log(hotels);
  return (
    <div>
      <PageTitle title="My Hotels" />
      <div className="p-4">
        <h2 className="text-xl">You have added {hotels?.length} hotels</h2>
        <div className="flex flex-col gap-4 items-center">
          {hotels &&
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="flex gap-4 flex-col w-full p-4 rounded border border-zinc-300"
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line line-clamp-3">
                  {hotel.description}
                </div>
                <div className="grid xl:grid-cols-[2fr_1fr_2fr_2fr_2fr] md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                  <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                    <BsMap />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                    <BsBuilding />
                    {hotel.type}
                  </div>
                  <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                    <BiMoney />${hotel.pricePerNight} per night
                  </div>
                  <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                    <BiHotel />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                    <BiStar />
                    {hotel.starRating} Star Rating
                  </div>
                </div>
                <span className="flex gap-3 justify-center sm:justify-end">
                  <button className="bg-red-500 text-white py-1.5 px-3 rounded font-bold">
                    Delete
                  </button>
                  <button className="bg-orange-500 text-white py-1.5 px-3 rounded font-bold">
                    Edit
                  </button>
                  <Link to={`/details/${hotel._id}`} className="custom-btn">
                    View Details
                  </Link>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyHotels;
