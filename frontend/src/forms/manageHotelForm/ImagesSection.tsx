import { useFormContext } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import skelaton from "../../assets/image.png";
import { HotelFormData } from "../../shared/Types";
import { showInputError } from "../../shared/utils";

const ImagesSection = () => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const images = watch("images");

  const handleUploadImage = (e: FileList) => {
    console.log(e[0]);
  };

  const handleAddImage = () => {
    if (images) {
      setValue("images", [
        ...images,
        {
          image: "https://ih-sajjad.netlify.app/assets/sajjad-5c02d570.png",
          label: "label 3",
        },
      ]);
    } else {
      setValue("images", [
        {
          image: "https://ih-sajjad.netlify.app/assets/sajjad-5c02d570.png",
          label: "label",
        },
      ]);
    }
  };

  const handleDeleteImage = (url: string) => {
    const newArray = images.filter((item) => item.image !== url);
    setValue("images", newArray);
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      {/* <div className="flex md:flex-row flex-col-reverse gap-2 "> */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-2">
          <label
            // htmlFor="image"
            className="border border-slate-300 flex items-center rounded"
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => handleUploadImage(e.target.files as FileList)}
              className="w-full text-gray-700 font-normal hidden"
            />
            <img
              src={skelaton}
              alt=""
              className="h-32 w-full rounded bg-black"
            />
          </label>
          <input
            type="text"
            placeholder="Label for the image"
            className="p-2 border border-slate-300 rounded"
            required
          />
          <div onClick={handleAddImage} className="custom-btn">
            Add
          </div>{" "}
        </div>
        {images?.map((item) => (
          <div className="flex flex-col gap-4 border border-[var(--main-color)] bg-slate-200 rounded h-fit relative cursor-pointer">
            <img
              src={item.image}
              alt=""
              className="h-40 object-cover object-center"
            />
            <span className="font-bold text-slate-600 text-center">
              {item.label}
            </span>
            <div
              onClick={() => handleDeleteImage(item.image)}
              className="absolute top-0 left-0 text-transparent hover:text-white hover:bg-red-500/30 w-full h-full z-10 flex items-center justify-center gap-0.5 font-bold"
            >
              <BiTrashAlt size={40} />
            </div>
          </div>
        ))}
      </div>

      {errors.images && showInputError()}
      {/* </div> */}
    </div>
  );
};

export default ImagesSection;
