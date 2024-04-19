import Carousel from "./Carousel";

const TopHotels = () => {
  return (
    <div className="custom-container my-4">
      <p className="text-cener font-semibold text-slate-500 mt-3">
        Don't know where to go? Let's see top rated hotels in Hotel Mania.
      </p>
      <Carousel />
    </div>
  );
};

export default TopHotels;
