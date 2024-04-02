import { ChangeEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

const ManageHotelForm = () => {
  const methods = useForm();
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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
