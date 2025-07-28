import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import greyvideo from "../assets/greyvideo.mp4";
import whiteoverlay from "../assets/whiteoverlay.png";

function TextVisibleOnScroll() {
  const colorText = useRef(null);
  const parentDiv = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const lines = [
    " Elevate your jewelry design with GemAI—where AI meets elegance.",
    " Instantly generate photorealistic 3D models, from filigree rings to",
    "  bespoke necklaces, refined with flawless precision. goodbye to manual",
    "   modeling and hello to effortless innovation—unleash your creativity.",
    " with GemAI, the ultimate AI-powered jewelry studio",
  ];

  useEffect(() => {
    if (!parentDiv.current) return;

    const colorText = gsap.utils.toArray(".colorText");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentDiv.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
       
        pin: true,
        pinSpacing: false,
      },
    });

    colorText.forEach((colorline) => {
      tl.to(colorline, { alpha: 1, ease: "power3.inOut", duration: 1 });
    });
    // Cleanup on unmount
    return () => {
      tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={parentDiv}
        className="w-screen overflow-hidden flex justify-center  items-start h-[200vh]"
      >
 <div className="w-full h-screen">
         <img
          className="absolute z-2 object-cover opacity-90"
          src={whiteoverlay}
          alt="img"
        />

        <video
          //   ref={videoRef}
          className="absolute mix-blend-overlay w-full z-1 opacity-50 object-cover "
          src={greyvideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

          <div className="w-[60vw]   mx-auto relative z-30 lg:mt-70  2xl:mt-75 ">
          {lines.map((line, i) => (
            <div
              key={i}
              className="relative w-full h-[4rem] lg:h-[2.5rem] overflow-hidden  " /* Set a height equal to line height */
            >
              {/* Base gray layer */}
              <span className="absolute inset-0 lg:text-3xl text-4xl text-gray-400 opacity-20 ">
                {line}
              </span>
              {/* Color layer on top */}
              <span
                className=" colorText absolute opacity-0 inset-0 lg:text-3xl text-4xl bg-clip-text text-transparent 
                          bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F]
                          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)] 
                           "
              >
                {line}
              </span>
            </div>
          ))}
       
</div>
 </div>
      </div>
    </>
  );
}

export default TextVisibleOnScroll;
