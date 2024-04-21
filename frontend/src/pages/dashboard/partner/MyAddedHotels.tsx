import { useState } from "react";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { HotelDataType } from "../../../../../backend/src/shared/types";
import * as apiClient from "../../../api-client";
import AddHotelModal from "../../../components/AddHotelModal";
import PageTitle from "../../../components/PageTitle";
import UpdateHotelModal from "../../../components/UpdateHotelModal";
import MyHotelCardSkeleton from "../../../components/skeletons/MyHotelCardSkeleton";
import { useAppContext } from "../../../contexts/UseContexts";
import { errorToast, successToast } from "../../../shared/utils";

const MyAddedHotels = () => {
  const { user } = useAppContext() || {};
  const [hotelData, setHotelData] = useState<HotelDataType>();
  const { data: hotels, refetch: refetchHotels } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    { enabled: !!user._id }
  );

  const { mutate: deleteHotel, isLoading } = useMutation(
    apiClient.deleteSingleHotel,
    {
      onSuccess: () => {
        refetchHotels();
        successToast("Hotel deleted successfully");
      },
      onError: (err: Error) => {
        errorToast(err.message);
      },
    }
  );

  const handleShowModal = document.getElementById(
    "add_hotel_modal"
  ) as HTMLDialogElement;

  const updateModal = (hotel: HotelDataType) => {
    setHotelData(hotel);
    return document.getElementById("update_modal") as HTMLDialogElement;
  };

  return (
    <div className="relative">
      <PageTitle title="My Hotels" />

      <div className="flex justify-end py-1 pr-4 border-b border-zinc-300">
        <button
          className="custom-btn"
          onClick={() => handleShowModal.showModal()}
        >
          Add Hotel
        </button>
        <AddHotelModal />
        <UpdateHotelModal hotel={hotelData} />
      </div>
      <div className="p-4">
        <h2 className="text-xl">You have added {hotels?.length} hotels</h2>
        <div className="flex flex-col gap-6 items-center py-5">
          {isLoading ? (
            <>
              <MyHotelCardSkeleton />
              <MyHotelCardSkeleton />
              <MyHotelCardSkeleton />
            </>
          ) : (
            hotels &&
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="flex gap-4 flex-col w-full p-4 rounded border border-zinc-300 shadow-lg shadow-slate-300"
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="flex md:flex-row flex-col gap-4 relative">
                  <div className="h-full flex-1">
                    <img
                      src={hotel.images[0].image}
                      alt=""
                      className="h-full w-full object-cover object-center rounded"
                    />
                  </div>
                  <span className="hotel-type-btn">
                    <BsBuilding />
                    {hotel.type}
                  </span>
                  <div className="flex-1 rounded p-4 border border-slate-300 flex flex-col">
                    <div className="flex-grow">
                      <p className="line-clamp-5 text-justify ">
                        {hotel.description}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-[1fr_1fr] sm:grid-cols-2 grid-cols-1 gap-2 mt-4">
                      <div className="border text-sm border-slate-300 rounded-sm p-3 flex items-center gap-1">
                        <BsMap />
                        {hotel.city}, {hotel.country}
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
                  </div>
                </div>

                <span className="flex gap-3 justify-center sm:justify-end">
                  <button
                    onClick={() => deleteHotel(hotel._id as string)}
                    className="bg-red-500 hover:bg-red-400 text-white py-1.5 px-3 rounded font-bold"
                  >
                    <IoTrashSharp />
                  </button>
                  <button
                    onClick={() => updateModal(hotel).showModal()}
                    className="bg-orange-500 text-white py-1.5 px-3 rounded font-bold"
                  >
                    <FaEdit />
                  </button>
                  <Link to={`/details/${hotel._id}`} className="custom-btn">
                    <FaEye />
                  </Link>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAddedHotels;
