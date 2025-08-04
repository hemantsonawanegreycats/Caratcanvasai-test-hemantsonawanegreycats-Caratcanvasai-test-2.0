import React from "react";
import CarouselAnimation from "../components/CarouselAnimation";
import ElementComingUpAnimation from "../components/ElementComingUpAnimation";
import HeroSection from "../components/HeroSection";
import MeetOurExperts from "../components/MeetOurExperts";
import RandomtextChar from "../components/RandomtextChar";
import ScaleBoxAnimation from "../components/ScaleBoxAnimation";
import ShowImgandPointers from "../components/ShowImgandPointers";
import TextVisibleOnScroll from "../components/TextVisibleOnScroll";

import ImageCursorTrail from "../components/ui/image-cursortrail";
import image1 from "../assets/slide-image-1.jpg";
import image2 from "../assets/slide-image-2.jpg";
import image3 from "../assets/slide-image-3.jpg";
import image4 from "../assets/slide-image-4.jpg";

const carousalimages = [image1, image2, image3, image4];

export default function HomePage() {
  return (
    <>
      {/* Main content */}
      <div className="">
        <HeroSection />
        <RandomtextChar />
        <CarouselAnimation />
        <ScaleBoxAnimation />
        <ElementComingUpAnimation />
        <TextVisibleOnScroll />
        <ShowImgandPointers comp={<MeetOurExperts />} />
      </div>

      {/* Cursor trail overlay */}
   
    </>
  );
}
