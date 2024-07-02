import videoBG from "/bg-video.mp4";

const Header = () => {
  return (
    <div className="relative">
      <video
        className="w-screen h-full absolute -z-10 object-cover"
        autoPlay
        loop
        muted
      >
        <source src={videoBG} type="video/mp4" className="w-full h-full" />
        Your browser does not support the video tag.
      </video>
      {/*  bg-[url('/images/banner.avif')] */}
      <div
        className={`custom-container py-5 text-[var(--bg-color)] h-[75vh] bg-cover bg-no-repeat bg-center`}
      >
        <h1 className="md:text-5xl text-3xl font-bold">
          Discover Your Dream Stay
        </h1>
        <p className="text-lg md:font-semibold mb-16">
          Where Comfort Meets Luxury and Every Moment Counts
        </p>
      </div>
    </div>
  );
};

export default Header;
