import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";

const Modal = () => {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useFormContext();

  console.log("Rendered");

  return (
    <dialog id="add_hotel_modal" className="modal">
      <div className="relative w-11/12 max-w-5xl bg-white rounded">
        <h3 className="font-bold text-2xl text-[var(--main-color)] border-b border-[var(--main-color)] p-4 shadow-lg z-10 shadow-[#0000005e]">
          Add New Hotel
        </h3>
        {/* Modal body here */}
        <div className="max-h-[80vh] overflow-y-scroll md:p-4 border border-slate-500">
          <ManageHotelForm />
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="bg-red-500 text-white w-8 h-8 rounded-full absolute top-2 right-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
