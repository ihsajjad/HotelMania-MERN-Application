import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import HotelDetailsSkeleton from "../components/skeletons/HotelDetailsSkeleton";
import GuestInfoForm from "../forms/GuestInfoForm";
import { useGetHotelById } from "../shared/CommonHooks";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HotelDetails = () => {
  const { id } = useParams();

  const { data: hotel, isLoading } = useGetHotelById(id as string);

  const description = hotel?.description?.replace(/\n/g, "<br />");

  return (
    <div className="custom-container space-y-6 my-6">
      {isLoading ? (
        <HotelDetailsSkeleton />
      ) : (
        <>
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

          {/* <div className="w-full"> */}
          <div className="relative w-full">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              // style={{
              //   "--swiper-navigation-color": "#fff",
              //   "--swiper-pagination-color": "#fff",
              // }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper mt-3 pb-10"
            >
              {hotel?.images?.map((image) => (
                <SwiperSlide
                  key={hotel?._id}
                  className="md:h-[450px] sm:h-[300px] h-[200px] my-auto"
                >
                  <img
                    src={image?.image}
                    alt={image.label}
                    loading="lazy"
                    className=" object-cover object-center h-full w-full mb-4 rounded"
                  />
                  <span className="md:text-3xl text-xl font-bold absolute top-0 right-0 z-10 text-[var(--main-color)] p-2 bg-black bg-opacity-40 rounded-t">
                    {image?.label}
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
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
            <div
              className="text-justify text-slate-700 border border-zinc-300 p-3 rounded"
              dangerouslySetInnerHTML={{ __html: description as string }}
            ></div>
            <GuestInfoForm
              hotelId={id as string}
              price={hotel?.pricePerNight as number}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HotelDetails;
