import { Bounce, toast } from "react-toastify";

export const successToast = (msg: string) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export const errorToast = (msg: string) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export const showInputError = (msg?: string) => {
  return (
    <span className="text-red-500 text-sm mt-0.5 font-normal">
      {msg ? msg : "This field is required"}
    </span>
  );
};
