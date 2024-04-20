// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useQuery } from "react-query";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import * as apiClient from "../api-client";
import HotelResultCard from "./HotelResultCard";
import HotelCardSkeleton from "./skeletons/HotelCardSkeleton";

const Carousel = () => {
  const { data: topHotels, isLoading: loadingTopHotels } = useQuery(
    "fetchTopHotels",
    apiClient.fetchTopHotels,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper mt-3 pb-10"
    >
      {loadingTopHotels ? (
        <HotelCardSkeleton />
      ) : (
        topHotels?.map((hotel) => (
          <SwiperSlide key={hotel?._id} className=" md:h-[350px] my-auto -z">
            <HotelResultCard hotel={hotel} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default Carousel;
