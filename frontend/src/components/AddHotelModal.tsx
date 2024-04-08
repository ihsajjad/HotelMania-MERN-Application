import { useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { errorToast, successToast } from "../shared/utils";

const AddHotelModal = () => {
  const [myReset, setMyRest] = useState<() => void>(() => {});
  const { mutate: addHotel, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      const btn = document.getElementById("modal-close-btn");
      btn?.click();
      successToast("Hotel added successfully");
      myReset();
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  return (
    <dialog id="add_hotel_modal" className="modal">
      <div className="relative w-11/12 max-w-5xl bg-white rounded">
        <h3 className="font-bold text-2xl text-[var(--main-color)] border-b border-[var(--main-color)] p-4">
          Add New Hotel
        </h3>
        {/* Modal body here */}
        <div className="max-h-[80vh] overflow-y-scroll md:p-4 border border-slate-500">
          <ManageHotelForm
            onSave={addHotel}
            isLoading={isLoading}
            setMyRest={setMyRest}
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button
              id="modal-close-btn"
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

export default AddHotelModal;
