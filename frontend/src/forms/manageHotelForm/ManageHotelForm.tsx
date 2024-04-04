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
    console.log(data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });

    if (data.images)
      data.images.forEach((image, i) => {
        formData.append(`images[${i}]`, JSON.stringify(image));
      });

    addHotel(formData);
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
