import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElementComingUpAnimation from "./ElementComingUpAnimation";
import animatedvideo from "../assets/animatedvideo.mp4";

function ScaleBoxAnimation() {
  const firstbox = useRef(null);
  const blurbg = useRef(null);
  const scalablebox = useRef(null);
  const secoundBox = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      blurbg.current,
      {
        y: 800,
        duration: 1,
        borderTopLeftRadius: "65rem",
        borderTopRightRadius: "65rem",
        borderBottomRightRadius: "0rem",
        borderBottomLeftRadius: "0rem",
      },
      {
        y: 0,
        duration: 1,
        borderTopLeftRadius: "0rem",
        borderTopRightRadius: "0rem",
        borderBottomRightRadius: "0rem",
        borderBottomLeftRadius: "0rem",
        scrollTrigger: {
          trigger: firstbox.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
        },
      }
    );

    gsap.to(scalablebox.current, {
      width: "110vw",
      height: "110vw",

      ease: "power2.inOut",
      borderTopLeftRadius: "0rem",
      borderTopRightRadius: "0rem",
      borderBottomRightRadius: "0rem",
      borderBottomLeftRadius: "0rem",
      scrollTrigger: {
        trigger: firstbox.current,
        start: "50% 50%", // ✅ starts after half scroll
        end: "bottom center",
        scrub: true,
        pin: true, // or true if you want to hold section
      },
    });
  }, [firstbox, secoundBox]);

  return (
    <>
      <div ref={secoundBox} className="w-screen overflow-hidden h-[150vh] ">
        <div
          ref={firstbox}
          className="w-screen h-[100vh]  relative bg-gradient-to-bl from-[#5A2E1F] via-[#A16247] to-[#D4A276] text-white  overflow-hidden"
        >
          {/* Blurred Background Layer */}
          <div
            ref={blurbg}
            className="w-[100%] h-[100%]  absolute inset-0 bg-cover bg-gradient-to-br from-[#ffd1a9] via-[#A16247] to-[#5A2E1F] text-white rounded-3xl blur-2xl z-0"
          ></div>

          {/* Foreground Content */}
          <div className="relative z-10 flex-col text-9xl text-white flex justify-center items-center h-screen">
            <div className=" uppercase">What</div>
            <video
              preload="auto"
              autoPlay
              loop
              muted
              ref={scalablebox}
              className="flex justify-center bg-transparent items-center w-[16rem] h-[9rem] rounded-3xl lg:left-[37vw] 2xl:left-[45vw] xl:left-[39.5vw] h-xl text-black "
            >
              <source
                className="rounded-3xl"
                src={animatedvideo}
                type="video/mp4"
              />
            </video>
            <div className=" uppercase">ARE</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScaleBoxAnimation;
