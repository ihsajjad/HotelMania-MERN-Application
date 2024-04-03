import { FormProvider, useForm } from "react-hook-form";
import { HotelFormData } from "../../shared/Types";
import DetailsSection from "./DetailsSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

const ManageHotelForm = () => {
  const methods = useForm<HotelFormData>();
  const onSubmit = methods.handleSubmit((data: HotelFormData) => {
    console.log(data);
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
          <button className="custom-btn w-full text-xl">Add Hotel</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
