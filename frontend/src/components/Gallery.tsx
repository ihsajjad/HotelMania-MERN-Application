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
      <h3 className="text-3xl text-center font-bold mb-5">
        Our <span className="text-[var(--main-color)]">Gallery</span>
      </h3>
      <div className="grid md:grid-cols-4 items-center justify-center gap-6 mt-10">
        {galleryLoading ? (
          <GallerySkeleton />
        ) : (
          gallery?.slice(0, 12)?.map((image) => (
            <Link
              to={`/details/${image._id}`}
              key={image.url}
              className="group h-full w-full object-cover relative"
            >
              <img
                src={image.url}
                alt=""
                loading="lazy"
                className="h-full w-full rounded object-center object-cover border-2 hover:border-[var(--main-color)] hover:scale-105 shadow-lg shadow-[#00000065] duration-300"
              />
              <span className="group-hover:block hidden absolute bottom-0 text-white font-bold bg-slate-700/80 py-1 px-2 rounded">
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
