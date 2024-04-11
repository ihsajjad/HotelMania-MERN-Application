// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useHotelsContext } from "../contexts/UseContexts";
import HotelResultCard from "./HotelResultCard";

const Carousel = () => {
  const { topHotels } = useHotelsContext();
  console.log(topHotels);
  return (
    <div className="custom-container">
      <div className="">
        {/* <h3 className="text-3xl text-center font-bold">
          Top <span className="text-[var(--main-color)]">Rated</span>
        </h3> */}
        <p className="text-cener font-semibold text-slate-500 mt-3">
          Don't know where to go? Let's see top rated hotels in Hotel Mania.
        </p>
      </div>
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
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-3 pb-8"
      >
        {topHotels.map((hotel) => (
          <SwiperSlide key={hotel._id} className=" md:h-[350px] my-auto">
            <HotelResultCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
