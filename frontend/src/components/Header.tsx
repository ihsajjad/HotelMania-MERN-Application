import Cube from "./animation-cube/Cube";
import videoBG from "/bg-video.mp4";

const Header = () => {
  return (
    <div className="relative">
      <video
        className="w-screen h-full absolute -z-[2] object-cover"
        autoPlay
        loop
        muted
      >
        <source src={videoBG} type="video/mp4" className="w-full h-full" />
      </video>

      <div className="h-full w-full bg-white/20 absolute -z-[1]" />

      <div className="flex flex-col md:flex-row items-center justify-center h-[75vh]">
        {/* header content container */}
        <div
          className={`custom-container md:w-3/4 md:h-full py-5 text-[var(--bg-color)] bg-cover bg-no-repeat bg-center flex flex-col justify-center`}
        >
          <h1 className="md:text-5xl text-3xl text-center md:text-start font-bold flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
            Discover Your <Cube />
          </h1>
          <p className="text-lg md:font-semibold text-center md:text-start mb-16 mt-3">
            Where Comfort Meets Luxury and Every Moment Counts
          </p>
        </div>

        {/* weather container */}
        <div className="md:w-1/4"></div>
      </div>
    </div>
  );
};

export default Header;
