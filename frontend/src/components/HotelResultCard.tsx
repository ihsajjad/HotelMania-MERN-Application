import { AiFillStar } from "react-icons/ai";
import { BiHotel } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HotelDataType } from "../shared/Types";

const HotelResultCard = ({ hotel }: { hotel: HotelDataType }) => {
  return (
    <div
      key={hotel._id}
      className="flex gap-4 md:flex-row flex-col w-full p-4 rounded md:h-80 border border-zinc-300"
    >
      <div className="flex-1 relative">
        <img
          src={hotel.images[0].image}
          alt=""
          className="rounded w-full h-full object-center object-cover"
        />
        <span className="hotel-type-btn">{hotel.type}</span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex">
            {Array.from({ length: hotel?.starRating || 0 }).map((_, i) => (
              <AiFillStar key={i} className="fill-yellow-400" />
            ))}
          </div>
          <h3 className="text-lg font-bold">{hotel.name}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-justify text-slate-500 md:line-clamp-5 line-clamp-2">
            {hotel.description}
          </p>
        </div>
        <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1 w-fit">
          <BiHotel />
          {hotel.adultCount} adults, {hotel.childCount} children
        </div>
        <div className="flex items-center justify-between">
          <div className="sm:block hidden">
            {hotel?.facilities?.slice(0, 1)?.map((facility) => (
              <span
                key={facility}
                className="text-sm bg-slate-200 rounded py-0.5 px-1"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 1 && (
              <span> +{hotel.facilities.length - 1} more</span>
            )}
          </div>
          <div>
            <span className="text-2xl font-bold">${hotel.pricePerNight}</span>
            <span>/Per night</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="custom-btn">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelResultCard;
