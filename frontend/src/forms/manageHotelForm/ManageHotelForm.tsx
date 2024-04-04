import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HotelDataType, HotelFormData } from "../../shared/Types";
import DetailsSection from "./DetailsSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

type ManageHotelProps = {
  onSave: (data: HotelFormData) => void;
  hotel?: HotelDataType;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, hotel, isLoading }: ManageHotelProps) => {
  const methods = useForm<HotelFormData>();

  useEffect(() => {
    methods.reset(hotel);
  }, [hotel, methods]);

  const onSubmit = methods.handleSubmit((formData: HotelFormData) => {
    const hotelData = { ...formData };

    if (formData.images === undefined || formData.images?.length < 3)
      return methods.setError("images", {
        message: "Minimum 3 images required!",
      });

    if (hotel) {
      hotelData._id = hotel._id;
      hotelData.userId = hotel.userId;
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
          <button
            className="custom-btn w-full text-xl disabled:bg-orange-400"
            disabled={isLoading}
          >
            {isLoading ? "Adding Hotel..." : "Add Hotel"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
