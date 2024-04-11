import { Link } from "react-router-dom";
import { useHotelsContext } from "../contexts/UseContexts";

const Gallery = () => {
  const { gallery } = useHotelsContext();

  console.log(gallery);
  return (
    <div className="custom-container bg-slate-100 py-10">
      <h3 className="text-3xl text-center font-bold mb-5">
        Our <span className="text-[var(--main-color)]">Gallery</span>
      </h3>
      <div className="grid md:grid-cols-4 items-center justify-center gap-6 mt-10">
        {gallery?.slice(0, 12)?.map((image) => (
          <Link
            to={`/details/${image._id}`}
            key={image.url}
            className="h-full w-full object-cover"
          >
            <img
              src={image.url}
              alt=""
              className=" h-full w-full rounded object-center object-cover border-2 hover:border-[var(--main-color)] hover:scale-150 shadow-lg shadow-[#00000065] duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
