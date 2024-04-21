// import { useMutation } from "react-query";
import { useMutation } from "react-query";
import { HotelDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { errorToast, successToast } from "../shared/utils";

const UpdateHotelModal = ({
  hotel,
  refetchHotels,
}: {
  hotel?: HotelDataType;
  refetchHotels: () => void;
}) => {
  const { mutate: updateHotel, isLoading } = useMutation(
    apiClient.updateHotel,
    {
      onSuccess: () => {
        const btn = document.getElementById(`update-modal-close-btn`);
        btn?.click();
        refetchHotels();
        successToast("Hotel updated successfully");
      },
      onError: (error: Error) => {
        errorToast(error.message);
      },
    }
  );

  return (
    <dialog id="update_modal" className="modal">
      <div className="relative w-11/12 max-w-5xl bg-white rounded">
        <h3 className="font-bold text-2xl text-[var(--main-color)] border-b border-[var(--main-color)] p-4">
          Update The Hotel
        </h3>
        {/* Modal body here */}
        <div className="max-h-[80vh] overflow-y-scroll md:p-4 border border-slate-500">
          <ManageHotelForm
            onSave={updateHotel}
            hotel={hotel}
            isLoading={isLoading}
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              id="update-modal-close-btn"
              className="bg-red-500 text-white w-8 h-8 rounded-full absolute top-2 right-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateHotelModal;
