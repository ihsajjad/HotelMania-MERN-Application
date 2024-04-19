import Gallery from "../components/Gallery";
import OurPartners from "../components/OurPartners";
import TopHotels from "../components/TopHotels.tsx";

const Home = () => {
  return (
    <div>
      <TopHotels />
      <Gallery />
      <OurPartners />
    </div>
  );
};

export default Home;
