import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import animatedvideoone from "../assets/animatedvideo2-.mp4";
import animatedvideothree from "../assets/animatedvideo3.mp4";
import animatedvideofourth from "../assets/animatedvideo4_1-.mp4";

function ShowImgandPointers({ comp }) {
  const pointerParentdiv = useRef(null);
  const scrollParent = useRef(null);
  const ponterhiddendiv = useRef(null);
  const [topMargin, setTopMargin] = useState(0);

  const mt = scrollParent?.current?.offsetHeight;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pointersimagesarray = gsap.utils.toArray(".pointersimages");

    if (ponterhiddendiv.current) {
      setTopMargin(ponterhiddendiv.current.offsetHeight);
    }

    // Create a ScrollTrigger–linked timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollParent.current,
        start: "top top",
        end: (self) => {
          // Total scroll needed so the first pointer stops at the parent’s top
          const parentHeight = scrollParent.current.offsetHeight;
          const pointerHeight =
            self.trigger.querySelector(".pointerParentdiv").offsetHeight;
          return `+=${parentHeight - pointerHeight}`;
        },
        scrub: true,
        pin: true,
      },
    });

    // Animate each pointer upward by 100% of its own height
    gsap.utils.toArray(".pointerParentdiv").forEach((p, i) => {
      console.log(p.firstElementChild);

      tl.to(
        p,
        {
          y: `-${scrollParent.current.offsetHeight}px`,
          ease: "power3.inOut",
          duration: 1,
        },
        i // place each tween sequentially
      );
      if (i !== 0) {
        tl.to(
          pointersimagesarray[i - 1],
          {
            y: "-200%",
            ease: "power3.inOut",
          },
          i
        );
      }

      tl.to(p?.firstElementChild, {
        height: 0,
        alpha: 0,
        ease: "power3.inOut",
        duration: 1,
      });
    });
  });

  return (
    <>
      <div ref={scrollParent} className="w-full bg-amber-100 h-[200vh]">
        <div className="w-full   h-screen flex bg-white relative ">
          <div className="flex-1/2 h-full pl-20 lg:pt-10 2xl:pt-20">
            <div className="h-[15%] ">
              <div className="font-medium lg:text-xl text-2xl capitalize">
                Key features
              </div>
              <div className="font-semibold lg:text-3xl 2xl:text-5xl mt-2 capitalize bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent ">
                The best in the business
              </div>
            </div>
            <div className="w-[85%] relative h-[75%] lg:mt-3 overflow-hidden rounded-3xl bg-gray-100">
              <video
                preload="auto"
                autoPlay
                loop
                muted
                src={animatedvideothree}
                className="absolute z-3 pointersimages object-cover  w-full h-full  transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] flex justify-center items-center rounded-3xl"
              ></video>

              <video
                preload="auto"
                autoPlay
                loop
                muted
                src={animatedvideoone}
                className="absolute z-2 pointersimages object-cover  w-full h-full  transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] flex justify-center items-center rounded-3xl"
              ></video>
              <video
                preload="auto"
                autoPlay
                loop
                muted
                src={animatedvideofourth}
                className="absolute z-1 pointersimages object-cover  w-full h-full  transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] flex justify-center items-center rounded-3xl"
              ></video>
            </div>
          </div>
          <div className="flex-1/2 h-full pl-20 lg:pt-30 2xl:pt-50 pt-31">
            {/* overflowhidden div */}
            <div
              ref={ponterhiddendiv}
              className="w-[85%] h-[100%] overflow-hidden rounded-3xl"
            >
              {/* pointer start */}

              <div
                style={{ marginTop: `${scrollParent.current?.offsetHeight}px` }}
                className={`  pointerParentdiv  w-full p-4   rounded-3xl transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] bg-[#A16247]`}
              >
                {/* pointofheight reduc */}
                <div className="w-full  px-5 overflow-hidden">
                  <div className="text-4xl text-white 2xl:mt-2 lg:text-2xl font-semibold capitalize">
                    Customizable product
                  </div>
                  <div className="mt-4 text-white opacity-60 lg:mt-2 lg:text-sm">
                    NeoLeaf provides advanced customization tools that deliver
                    top model performance at a competitive inference cost.
                  </div>
                </div>

                <div className="w-full     lg:py-4   ">
                  <div className="2xl:text-xl leading-tight   ml-4 mb-6 text-white font-semibold capitalize">
                    {" "}
                    Customizable product
                  </div>
                  <span className="text-xl  lg:text-sm lg:px-5 px-7  py-3 bg-white ml-4 rounded-4xl bg-gradient-to-br from-[#ffffff] via-[#fff0ea] to-[#a15d46]">
                    Custom
                  </span>
                </div>
              </div>

              <div className="pointerParentdiv w-full p-4 rounded-3xl mt-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] bg-[#A16247]">
                {/* pointofheight reduc */}
                <div className="w-full    px-5 overflow-hidden">
                  <div className="text-4xl 2xl:mt-2 lg:text-2xl text-white font-semibold capitalize">
                    Customizable product
                  </div>
                  <div className="mt-4 lg:mt-2 text-white opacity-60 lg:text-sm">
                    NeoLeaf provides advanced customization tools that deliver
                    top model performance at a competitive inference cost.
                  </div>
                </div>
                <div className="w-full     lg:py-4   ">
                  <div className="2xl:text-xl leading-tight   ml-4 mb-6 text-white font-semibold capitalize">
                    {" "}
                    Customizable product
                  </div>
                  <span className="text-xl  lg:text-sm lg:px-5 px-7  py-3 bg-white ml-4 rounded-4xl bg-gradient-to-br from-[#ffffff] via-[#fff0ea] to-[#a15d46]">
                    Custom
                  </span>
                </div>
              </div>

              <div className="pointerParentdiv w-full p-4   rounded-3xl mt-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)] bg-[#A16247] ">
                {/* pointofheight reduc */}
                <div className="w-full    px-5 overflow-hidden">
                  <div className="text-4xl 2xl:mt-2 text-white lg:text-2xl font-semibold capitalize">
                    Customizable product
                  </div>
                  <div className="mt-4 lg:mt-2 text-white opacity-60 lg:text-sm">
                    NeoLeaf provides advanced customization tools that deliver
                    top model performance at a competitive inference cost.
                  </div>
                </div>
                <div className="w-full     lg:py-4   ">
                  <div className="2xl:text-xl leading-tight   ml-4 mb-6 text-white font-semibold capitalize">
                    {" "}
                    Customizable product
                  </div>
                  <span className="text-xl  lg:text-sm lg:px-5 px-7  py-3 bg-white ml-4 rounded-4xl bg-gradient-to-br from-[#ffffff] via-[#fff0ea] to-[#a15d46]">
                    Custom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {comp}
      </div>
    </>
  );
}

export default ShowImgandPointers;
