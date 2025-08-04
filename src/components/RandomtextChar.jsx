import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import bgimage from "../assets/images/bg_02.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function RandomtextChar() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollparent = useRef(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray(".chars");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollparent.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      chars,
      {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        opacity: 0,
        filter: "blur(20px)",
        duration: 1,
      },
      {
        x: 0,
        y: 0,

        opacity: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power2.out",
        duration: 1,
        stagger: 0.3,
      }
    );

    tl.to(chars, {
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-300, 300),
      opacity: 0,
      filter: "blur(30px)",
      duration: 2,
      ease: "power2.in",
      stagger: 0.02,
    });
  }, []);

  return (
    <>
      <div
        ref={scrollparent}
        className="w-screen   flex h-[100vh] items-center flex-col justify-start"
        style={{backgroundImage: `url(${bgimage})`, backgroundSize: "cover"}}
      >
        <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mt-8 sm:mt-16 md:mt-24 lg:mt-32 2xl:mt-44 text-center flex flex-wrap justify-center">
          {[..."Find - new "].map((char, i) => (
            <span
              className="chars transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] uppercase bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent"
              key={i}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="w-[95%]  sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mt-4 sm:mt-8 md:mt-12 lg:mt-16 2xl:mt-20 text-center flex flex-wrap justify-center">
          {[..."creations - for "].map((char, i) => (
            <span
              className="chars transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] uppercase bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent"
              key={i}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mt-4 sm:mt-8 md:mt-12 lg:mt-16 2xl:mt-20 text-center flex flex-wrap justify-center">
          {[..."Your-brand "].map((char, i) => (
            <span
              className="chars transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8rem] uppercase bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent"
              key={i}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default RandomtextChar;
