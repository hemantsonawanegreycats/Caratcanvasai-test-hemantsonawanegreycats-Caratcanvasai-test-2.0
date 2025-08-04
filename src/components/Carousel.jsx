import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Carousel({
  title,
  overlayText,
  backgroundImages,
  objectStyle,
  width,
  height,
  parentCarouselCss,
  rightText,
}) {
  useGSAP(() => {
    const carditems = gsap.utils.toArray(".carditems");
    const title = gsap.utils.toArray(".title");

    gsap.to(carditems, {
      position: "relative",
      right: "0%",
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
      alpha: 1,
    });

    gsap.to(title, {
      duration: 1.2,
      ease: "power3.inOut",
      alpha: 1,
    });

    // carditems.forEach((el) => {
    //   el.addEventListener("mouseenter", () => {
    //     gsap.to(el, {
    //       scale: 1.2,
    //       duration: 1,

    //       ease: "power3.inOut",
    //     });
    //   });

    //   el.addEventListener("mouseleave", () => {
    //     gsap.to(el, {
    //       scale: 1, // back to original size
    //       duration: 1,

    //       ease: "power3.inOut",
    //     });
    //   });
    // });

  });

  return (
    <ShadCarousel className={`${parentCarouselCss}`}>
      <div className=" flex justify-between">
        <span className=" title opacity-0 text-[1.9rem] font-semibold mb-5 bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent">
          {" "}
          {title}
        </span>
        {rightText ? (
          <span className="title opacity-0 bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent font-">
            {rightText}
          </span>
        ) : (
          ""
        )}
      </div>
      <CarouselContent className={`flex relative  ${width} ${height}`}>
        {backgroundImages?.map((image, index) => (
          <CarouselItem
            className={`carditems opacity-0 absolute -right-[80vw]  ${width} ${height} `}
            key={index}
          >
            <div
              className={`relative overflow-hidden rounded-3xl w-full h-full`}
            >
              <img
                className={`w-full h-full ${objectStyle} rounded-3xl`}
                src={image.src}
                alt={image.title}
              />
              {overlayText ? (
                <div className="w-full xl:h-29 lg:h-20 absolute bottom-0 z-2 ">
                  <div className="w-full px-4 xl:pt-7 lg:pt-0 pt-4 h-full flex flex-col  relative bg-gradient-to-t from-[#D4A276] via-[#A16247] to-102%">
                    <Badge className="px-4  py-1 lg:text-[0.6rem] xl:text-[0.8rem] bg-white text-[var(--color-primary-dark)]">
                      {image.title}
                    </Badge>
                    <span className="text-white lg:text-[0.7rem] xl:text-[0.8rem] font-normal mt-3 leading-5 lg:leading-4 tracking-wide text-wrap">
                      {image.description}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </ShadCarousel>
  );
}
export default Carousel;
