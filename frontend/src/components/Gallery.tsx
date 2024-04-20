import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import GallerySkeleton from "./skeletons/GallerySkeleton";

const Gallery = () => {
  const { data: gallery, isLoading: galleryLoading } = useQuery(
    "fetchGalleryImages",
    apiClient.fetchGalleryImages,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="custom-container bg-slate-100 py-10">
      <h2 className="section-title">Hotel&apos;s Gallery</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 items-center justify-center gap-6 mt-10 min-full">
        {galleryLoading ? (
          <GallerySkeleton />
        ) : (
          gallery?.map((image, i) => (
            <Link
              to={`/details/${image._id}`}
              key={image.url}
              className={`group h-[150px] w-full object-cover relative ${i > 5 ? "md:block hidden" : "block"}`}
            >
              <img
                src={image.url}
                alt=""
                className="h-full w-full rounded object-center object-cover border-2 hover:border-[var(--main-color)] hover:scale-105 shadow-lg shadow-[#00000065] duration-300"
              />
              <span className="group-hover:block hidden absolute bottom-0 text-white font-bold bg-slate-700/80 py-1 px-2 rounded duration-300">
                {image.name}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
