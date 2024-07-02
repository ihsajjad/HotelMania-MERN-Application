import Gallery from "../components/Gallery";
import OurPartners from "../components/OurPartners";
import SearchBar from "../components/SearchBar.tsx";
import TopHotels from "../components/TopHotels.tsx";

const Home = () => {
  return (
    <div>
      <div className="lg:-mt-9 md:-mt-16 -mt-20">
        <SearchBar />
      </div>
      <TopHotels />
      <Gallery />
      <OurPartners />
    </div>
  );
};

export default Home;
