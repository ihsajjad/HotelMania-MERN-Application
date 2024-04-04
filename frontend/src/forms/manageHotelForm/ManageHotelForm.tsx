import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { HotelFormData } from "../../shared/Types";
import DetailsSection from "./DetailsSection";
import FacitiliesSection from "./FacitiliesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

const ManageHotelForm = () => {
  const methods = useForm<HotelFormData>();

  const { mutate: addHotel } = useMutation(apiClient.addMyHotel, {
    onSuccess: (result) => console.log(result),
    onError: (error) => console.log(error),
  });

  const onSubmit = methods.handleSubmit((data: HotelFormData) => {
    console.log(data.images);
    if (data.images === undefined || data.images?.length < 3)
      return methods.setError("images", {
        message: "Minimum 3 images required!",
      });

    // addHotel(data);
  });

  console.log(methods.formState.errors);

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
