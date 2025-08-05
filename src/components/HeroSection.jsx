import { useRef, useState } from "react";
import imgone from "../assets/slide-image-1.jpg";
import imgtwo from "../assets/slide-image-2.jpg";
import imgthree from "../assets/slide-image-3.jpg";
import imgfour from "../assets/slide-image-4.jpg";
import imgfive from "../assets/slide-image-5.jpg";
import bgimage from "../assets/images/bg_01.jpg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function HeroSection() {
  const bigBox = useRef(null);
  const mainButton = useRef(null);

  useGSAP(() => {
    const letters = gsap.utils.toArray(".letter");
    const letterstwo = gsap.utils.toArray(".lettertwo");
    const heading = gsap.utils.toArray(".heading");
    const subheading = gsap.utils.toArray(".subheading");
    const heroimages = gsap.utils.toArray(".heroimages");

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    let mm = gsap.matchMedia();

    mm.add(
      {
        md: "(min-width:900px) and (max-width:1278px)",
        lg: "(min-width:1279px) and (max-width:1399px)",
        xl: "(min-width:1400px) and (max-width:2000px)",
      },
      (context) => {
        const { lg, xl, md } = context.conditions;
        console.log(lg, xl, md);
        tl.to(letters, { y: "-200%", alpha: 1, stagger: 0.1 }, "bg-text")
          .to(letterstwo, { y: "-45%", alpha: 1, stagger: 0.1 }, "bg-text")
          .to(
            bigBox.current,
            {
              y: () => {
                if (lg) {
                  return "-102%";
                }else if (xl) {
                  return "-105%"
                }
              },

              duration: 1.5,
            },
            "bigbox"
          )
          .to(heading, { y: "-65%", scale: 1.2, duration: 0.9 }, "<")
          .to(
            heading,
            {
              y: "-85%",

              scale: 1,
              duration: 0.9,
            },
            "-=0.5"
          )
          .to(
            subheading,
            {
              y: () => {
                if (lg) {
                  return "-299%";
                } else if (xl) {
                  return "-455%";
                }
              },
              duration: 2,
              stagger: 0.5,
            },
            "bigbox"
          )
          .to(
            mainButton.current,
            { width: "30%", y: "-200%", duration: 1, delay: 1 },
            "bigbox"
          )
          .to(
            heroimages,
            {
              y: () => {
                if (lg) {
                  return "-28%";
                } else if (xl) {
                  return "-56%";
                }
              },
              duration: 0.6,
              stagger: 0.2,
            },
            "<"
          );
      }
    );

    // Do NOT clearProps or otherwise reset styles here
  }, []); // runs only once

  return (
    <>
      <div className="w-full 2xl:h-[calc(100vh-6rem)]  lg:h-[97vh]  relative overflow-hidden flex items-center justify-center">
        {/* gradientbox */}
        {/* {background text } */}
        <div className="flex flex-col items-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]">
          <div className="flex justify-around mt-16 sm:mt-20 md:mt-28 w-full sm:w-[80%] md:w-[60%]">
            {["W", "E", "L", "C", "O", "M", "E", "T", "O"].map((char, i) => (
              <span
                key={i}
                className="letter text-lg sm:text-xl md:text-2xl font-r opacity-0 bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center">
            {["C", "A", "R", "A", "T", "C", "A", "N", "V", "S"].map(
              (char, i) => (
                <span
                  key={i}
                  className="lettertwo text-4xl sm:text-5xl md:text-6xl lg:text-[8vw] font-r bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent"
                >
                  {char}
                </span>
              )
            )}
          </div>
        </div>
        <div
          ref={bigBox}
          className="bigbox absolute w-[98%]  sm:w-[95%] md:w-[92%] h-[85%] sm:h-[88%] lg:h-[87%] xl:h-[85%] 2xl:h-[90%] md:h-[90%] flex flex-col overflow-hidden items-center bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] text-white rounded-2xl sm:rounded-3xl
      -bottom-[85vh] sm:-bottom-[88vh] md:lg:-bottom-[90vh] lg:-bottom-[82vh]"
        >
          {/* heading text */}
          <div className="text-center flex flex-col items-center mt-10 sm:mt-16 md:mt-20 lg:mt-25 2xl:mt-30">
            <div className="heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight bg-gradient-to-r from-[#ffc7b0] to-white bg-clip-text text-transparent">
              Your Design. Your Story.
            </div>
            <div className="heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  2xl:text-8xl leading-tight mt-2 md:mt-2 lg:mt-0 bg-gradient-to-r from-[#ffc7b0] to-white bg-clip-text text-transparent">
              Our AI brilliance
            </div>
            {/* subtext text */}
            <div className="flex flex-col mt-2  md:mt-3 text-xs sm:text-sm md:text-base 2xl:text-[1rem]">
              <span className="subheading font-extralight tracking-widest">
                It is a long established fact that a reader will be distracted
                by
              </span>
              <span className="subheading font-extralight tracking-widest">
                the readable content of a page when looking at its layout
              </span>
            </div>
            {/* button */}
            <div
              ref={mainButton}
              className="w-0 overflow-hidden h-8 sm:h-9 2xl:h-13 mt-4 xl:mt-2 xl:mb-8 2xl:mt-6 sm:mt-6 rounded-4xl font-bold flex justify-center items-center text-[#5f3c2a] z-20 bg-gradient-to-br from-[#ffffff] via-[#fff0ea] to-[#a15d46]"
            >
              <input
                type="text"
                className="w-2/3 outline-none bg-white h-full rounded-l-3xl flex items-center pl-3 sm:pl-6 text-gray-400 font-medium text-xs sm:text-base"
                placeholder="Enter Here"
              />
              <div className="flex-1/3 text-xs sm:text-base"> Enter </div>
            </div>
            {/* images */}
            <div className="flex flex-wrap justify-center items-end mt-4 sm:mt-6 xl:mt-8 2xl:mt-16 gap-2">
              <div
                style={{ backgroundImage: `url(${imgone})` }}
                className="heroimages rounded-xl sm:rounded-2xl w-24 h-20 sm:w-32 sm:h-28 md:w-44 md:h-40 2xl:w-70 xl:w-50 xl:h-56 bg-white bg-cover bg-top"
              ></div>
              <div
                style={{ backgroundImage: `url(${imgtwo})` }}
                className="heroimages rounded-xl sm:rounded-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-45 2xl:w-70 xl:w-50 xl:h-66 bg-white bg-cover bg-top"
              ></div>
              <div
                style={{ backgroundImage: `url(${imgthree})` }}
                className="heroimages rounded-xl sm:rounded-2xl w-24 h-28 sm:w-32 sm:h-36 md:w-44 md:h-49 2xl:w-70 xl:w-50 xl:h-76 bg-white bg-cover bg-top"
              ></div>
              <div
                style={{ backgroundImage: `url(${imgfour})` }}
                className="heroimages rounded-xl sm:rounded-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-45 2xl:w-70 xl:w-50 xl:h-66 bg-white bg-cover bg-top"
              ></div>
              <div
                style={{ backgroundImage: `url(${imgfive})` }}
                className="heroimages rounded-xl sm:rounded-2xl w-24 h-20 sm:w-32 sm:h-28 md:w-44 md:h-40 2xl:w-70 xl:w-50 xl:h-56 bg-white bg-cover bg-top"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
