import { useRef } from "react";
import imgone from "../assets/slide-image-1.jpg";
import imgtwo from "../assets/slide-image-2.jpg";
import imgthree from "../assets/slide-image-3.jpg";
import imgfour from "../assets/slide-image-4.jpg";
import imgfive from "../assets/slide-image-5.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import bgimage from "../assets/images/bg_03.jpg";
import bgimage2 from "../assets/images/bg_04.jpg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function CarouselAnimation() {
  const hiddenimage = useRef(null);
  const containerRef = useRef(null);
  const scrollerparendiv = useRef(null);
  const singleimage = useRef(null);
  const firstScrollDiv = useRef(null);

  const imagesarray = [
    imgone,
    imgtwo,
    imgthree,
    imgfour,
    imgfive,
    imgone,
    imgtwo,
    imgthree,
    imgfour,
    imgfive,
  ];

  useGSAP(() => {
    const images = gsap.utils.toArray(".images", containerRef.current);

    // First timeline for horizontal carousel animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollerparendiv.current,
        start: "top 30%",
        end: "bottom bottom",
        invalidateOnRefresh: true,
      },
    });

    tl.to(images, {
      x: () =>
        -(containerRef.current.scrollWidth - containerRef.current.offsetWidth),
      ease: "power2.inOut",
      delay: 0.6,
      duration: 1,
    });

    // Second timeline for moving hero card to hidden slot
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: scrollerparendiv.current,
        start: "top 70%",
        end: "bottom bottom",
        invalidateOnRefresh: true,
      },
    });

    // Helper function to get accurate coordinates
    const getTargetCoordinates = () => {
      if (!hiddenimage.current || !singleimage.current) return { x: 0, y: 0 };

      // Convert coordinates from hidden image space to hero card parent space
      const { x, y } = MotionPathPlugin.convertCoordinates(
        hiddenimage.current,
        singleimage.current.offsetParent,
        { x: 0, y: 0 }
      );

      // Account for margin (m-3 = 12px) if needed
      return { x: x, y: y };
    };

    tl2.to(singleimage.current, {
      x: () => getTargetCoordinates().x - singleimage.current.offsetLeft,
      y: () => getTargetCoordinates().y - singleimage.current.offsetTop,
      rotate: 0,
      ease: "power3.inOut",
      duration: 1,
    });

    tl2.to(singleimage.current, {
      alpha: 0,
      duration: 0,
    });
    tl2.to(hiddenimage.current, { alpha: 1, duration: 0 });
  });

  return (
    <>
      {/* Hero section with positioned card */}
      <div
        ref={firstScrollDiv}
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
        }}
        className="w-screen  h-screen flex justify-center  items-center  relative"
      >
        <div className="relative 2xl:text-[10rem] mx-auto lg:text-8xl text-[12rem] z-1 font-normal lg:w-lg lg:leading-20 2xl:leading-40 2xl:w-[55vw] leading-44 bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent text-center uppercase">
          Start with AI Jewelry Generator
        </div>

        <img
          ref={singleimage}
          className="absolute mx-auto 2xl:w-[20rem] xl:w-[16rem] lg:w-[12rem] rotate-12 rounded-3xl z-30"
          src={imgthree}
          alt="hero image"
        />
      </div>

      {/* Carousel section */}
      <div
        ref={scrollerparendiv}
        style={{
          backgroundImage: `url(${bgimage2})`,
          backgroundSize: "cover",
        }}
        className="w-screen relative h-screen  flex items-center bg-gray-50"
      >
        <div ref={containerRef} className="w-full flex pl-2 overflow-x-hidden">
          {imagesarray.map((imagelink, i) => (
            <img
              key={i}
              ref={i === 2 ? hiddenimage : null}
              className={`images 2xl:w-[20rem] xl:w-[16rem] lg:w-[12rem] m-3 rounded-3xl ${
                i === 2 ? "opacity-0" : ""
              }`}
              src={imagelink}
              alt={`carousel image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CarouselAnimation;
