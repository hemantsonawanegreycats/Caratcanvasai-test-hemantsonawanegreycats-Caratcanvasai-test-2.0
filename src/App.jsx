import CarouselAnimation from "./components/CarouselAnimation";
import ElementComingUpAnimation from "./components/ElementComingUpAnimation";
import FallingButtions from "./components/FallingButtons";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MeetOurExperts from "./components/MeetOurExperts";
import NavBar from "./components/NavBar";
import RandomtextChar from "./components/RandomtextChar";
import ScaleBoxAnimation from "./components/ScaleBoxAnimation";
import ShowImgandPointers from "./components/ShowImgandPointers";
import TextVisibleOnScroll from "./components/TextVisibleOnScroll";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <RandomtextChar />
      <CarouselAnimation />
      <ScaleBoxAnimation />
      <ElementComingUpAnimation />
      <TextVisibleOnScroll />
      <ShowImgandPointers comp={<MeetOurExperts />} />
      <FallingButtions />
    </>
  );
}

export default App;
