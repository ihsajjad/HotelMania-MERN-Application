import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div>
      <div className="bg-slate-400 custom-container py-5 text-white">
        <h1 className="md:text-5xl text-3xl font-bold">
          Discover Your Dream Stay
        </h1>
        <p className="text-lg md:font-semibold mb-16">
          Where Comfort Meets Luxury and Every Moment Counts
        </p>
      </div>
      <div className="custom-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
