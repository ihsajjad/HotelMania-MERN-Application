import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HotelDataType } from "../../../../backend/src/shared/types";
import DetailsSection from "./DetailsSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

type ManageHotelProps = {
  onSave: (data: HotelDataType) => void;
  hotel?: HotelDataType;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, hotel, isLoading }: ManageHotelProps) => {
  const methods = useForm<HotelDataType>({ defaultValues: hotel });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (hotel) reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formData: HotelDataType) => {
    const hotelData = { ...formData };

    // validating images length
    if (formData.images === undefined || formData.images?.length < 3)
      return methods.setError("images", {
        message: "Minimum 3 images required!",
      });

    // adding existing properties for update hotel
    if (hotel) {
      hotelData._id = hotel._id;
      hotelData.userId = hotel.userId;
      hotelData.starRating = hotel.starRating;
    }

    onSave(hotelData);
    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
        <DetailsSection />
        <TypeSection />
        <FacitiliesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-center mt-4">
          <button className="custom-btn w-full text-xl" disabled={isLoading}>
            {hotel?._id ? (
              isLoading ? (
                <AiOutlineLoading3Quarters
                  size={24}
                  className="animate-spin mx-auto my-0.5"
                />
              ) : (
                "Update"
              )
            ) : isLoading ? (
              <AiOutlineLoading3Quarters
                size={24}
                className="animate-spin mx-auto my-0.5"
              />
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
