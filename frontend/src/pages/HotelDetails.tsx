import { isArray } from "chart.js/helpers";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";
import HotelDetailsSkeleton from "../components/skeletons/HotelDetailsSkeleton";
import GuestInfoForm from "../forms/GuestInfoForm";

interface ImageType {
  image: string;
  label: string;
}
const HotelDetails = () => {
  const [currImage, setCurrImage] = useState<ImageType>();
  const [images, setImages] = useState<ImageType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const { id } = useParams();

  // const { data: hotel, isLoading } = useGetHotelById(id as string);
  const hotel = useLoaderData() as HotelDataType;

  // changing the image requesting url for low quality image
  useEffect(() => {
    if (hotel) setIsLoading(false);
    if (isArray(hotel?.images) && hotel?.images?.length > 0) {
      const firstImage = hotel?.images[0];
      const initialImage = firstImage?.image?.replace(
        "upload",
        "upload/h_450,w_1000/q_90"
      );
      setCurrImage({
        image: initialImage as string,
        label: firstImage?.label as string,
      });

      const images = hotel.images.map((item) => {
        const url = item?.image?.replace("upload", "upload/h_150,w_200/q_60");
        return { image: url, label: item.label };
      });

      setImages(images);
    }
  }, [hotel, hotel?.images]);

  const changeCurrentImage = ({ image, label }: ImageType) => {
    const url = image.replace("/h_150,w_200/q_60", "/h_450,w_1000/q_90");
    setCurrImage({ image: url, label });
  };
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

          <div className="">
            <div className="relative">
              <img
                src={currImage?.image}
                alt={currImage?.label}
                className="lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] w-full mb-4 rounded"
              />
              <span className="md:text-3xl text-xl font-bold absolute bottom-0 right-0 z-10 text-[var(--main-color)] p-2 bg-black bg-opacity-40 rounded-t">
                {currImage?.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {images &&
                images?.map((item) => (
                  <img
                    key={item?.image}
                    src={item?.image}
                    alt={item?.label}
                    className={`${currImage?.image === item.image ? "border-[var(--main-color)]" : "opacity-60"} hover:border-[var(--main-color)] hover:opacity-100 border-4 cursor-pointer rounded duration-150 md:h-28 md:w-40 h-20 w-32`}
                    onClick={() => changeCurrentImage(item)}
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
            <div
              className="text-justify text-slate-700 border border-zinc-300 p-3 rounded"
              dangerouslySetInnerHTML={{ __html: description as string }}
            ></div>
            <GuestInfoForm
              // hotelId={id as string}
              hotelId={hotel._id as string}
              price={hotel?.pricePerNight as number}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HotelDetails;
