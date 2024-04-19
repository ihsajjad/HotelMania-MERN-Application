import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";

const HotelResultCard = ({ hotel }: { hotel: HotelDataType }) => {
  return (
    <div
      key={hotel?._id}
      className="flex gap-4 md:flex-row flex-col w-full p-4 rounded h-full border border-zinc-300"
    >
      <div className="flex-1 relative h-full">
        <img
          src={hotel?.images[0]?.image}
          alt={hotel?.images[0]?.label}
          className="rounded w-full h-full object-center object-cover"
        />
        <span className="hotel-type-btn">{hotel?.type}</span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex">
            {Array.from({ length: hotel?.starRating || 0 }).map((_, i) => (
              <AiFillStar key={i} className="fill-yellow-400" />
            ))}
          </div>
          <h3 className="text-lg font-bold">{hotel?.name}</h3>
          <span>
            {hotel?.city}, {hotel?.country}
          </span>
        </div>
        <div className="flex-grow">
          <p className="text-justify text-slate-500 md:line-clamp-4 line-clamp-2">
            {hotel?.description}
          </p>
        </div>

        <div className="sm:block hidden">
          {hotel?.facilities?.slice(0, 1)?.map((facility: string) => (
            <span
              key={facility}
              className="text-sm bg-slate-200 rounded py-0.5 px-1"
            >
              {facility}
            </span>
          ))}
          {hotel?.facilities?.length > 1 && (
            <span> +{hotel?.facilities?.length - 1} more facilities</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${hotel?.pricePerNight}</span>
            <span>/Per night</span>
          </div>
          <Link to={`/details/${hotel?._id}`} className="custom-btn">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelResultCard;
