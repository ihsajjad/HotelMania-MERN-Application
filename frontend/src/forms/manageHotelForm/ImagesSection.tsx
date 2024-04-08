import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { useMutation } from "react-query";
import { HotelDataType } from "../../../../backend/src/shared/types";
import * as apiClient from "../../api-client";
import skelaton from "../../assets/image.png";
import { showInputError } from "../../shared/utils";

const ImagesSection = () => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<HotelDataType>();

  const [image, setImage] = useState<{
    url: string;
    label: string;
    err?: string;
  }>({
    url: "",
    label: "",
    err: "",
  });
  const images = watch("images");

  const { mutate: uploadImage } = useMutation(apiClient.uploadImage, {
    onSuccess: (result) => {
      setImage((pre) => ({ ...pre, url: result.url }));
    },
    onError: () => {
      setImage({
        url: "",
        label: "",
        err: "",
      });
    },
  });

  const handleUploadImage = async (e: FileList) => {
    setImage({ url: "", label: "", err: "" });
    const formData = new FormData();
    formData.append("file", e[0]);
    if (e[0]?.size > 1024 * 1024) {
      return setImage({
        err: "Maximum 1 MB",
        url: "",
        label: "",
      });
    }

    uploadImage(formData);
  };

  const handleAddImage = () => {
    if (images) {
      setValue("images", [
        ...images,
        {
          image: image.url,
          label: image.label,
        },
      ]);
    } else {
      setValue("images", [
        {
          image: image.url,
          label: image.label,
        },
      ]);
    }
    setImage({ url: "", label: "", err: "" });
    if (images?.length >= 1) delete errors.images;
  };

  const handleDeleteImage = (url: string) => {
    const newArray = images.filter((item) => item.image !== url);
    setValue("images", newArray);
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
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
              src={image.url ? image.url : skelaton}
              alt=""
              className="h-32 w-full rounded cursor-pointer"
            />
          </label>
          {image.err && (
            <span className="text-red-400 text-xs">{image.err}</span>
          )}
          <input
            type="text"
            placeholder="Label for the image"
            value={image.label}
            onChange={(e) => setImage((p) => ({ ...p, label: e.target.value }))}
            className="px-2 py-1 border border-slate-300 rounded"
          />

          <button
            type="button"
            onClick={handleAddImage}
            disabled={image.url === ""}
            className="custom-btn disabled:bg-gray-400 disabled:pointer-events-none"
          >
            Add
          </button>
        </div>
        {images?.map((item) => (
          <div
            key={item.image}
            className="flex flex-col gap-4 border border-[var(--main-color)] bg-slate-200 rounded h-fit relative cursor-pointer"
          >
            <img
              src={item.image}
              alt=""
              className="h-40 object-cover object-center"
            />
            <span className="font-bold text-slate-600 text-center text-xl pb-1">
              {item.label}
            </span>
            <div
              onClick={() => handleDeleteImage(item.image)}
              className="absolute top-0 left-0 text-transparent hover:text-white hover:bg-red-500/30 w-full h-full z-10 flex items-center justify-center gap-0.5 font-bold"
            >
              <BiTrash size={40} />
            </div>
          </div>
        ))}
      </div>

      {errors.images && showInputError(errors.images.message)}
    </div>
  );
};

export default ImagesSection;
