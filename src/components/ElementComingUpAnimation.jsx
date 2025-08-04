import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import imgone from "../assets/slide-image-1.jpg";
import imgtwo from "../assets/slide-image-2.jpg";
import imgthree from "../assets/slide-image-3.jpg";
import imgfour from "../assets/slide-image-4.jpg";
import backimage from  "../assets/images/bg_01.jpg";
import lines from "../assets/lines.png";

function ElementComingUpAnimation() {
  const ParenDiv = useRef(null);
  const bglines = useRef(null);

  useGSAP(() => {
    const firstline = gsap.utils.toArray(".firstline");
    const secoundline = gsap.utils.toArray(".secoundline");
    const headingEls = gsap.utils.toArray(".heading");
    const mm = gsap.matchMedia();

    mm.add(
      {
        isSmallDesktop: "(max-width: 1024px)", // ≤1024px
        isMediumDesktop: "(min-width: 1025px) and (max-width: 1280px)", // 1025–1280px
        isLargeDesktop: "(min-width: 1281px) and (max-width: 1536px)", // 1281–1536px
        isXLargeDesktop: "(min-width: 1537px)", // ≥1537px
      },
      (context) => {
        const {
          isSmallDesktop,
          isMediumDesktop,
          isLargeDesktop,
          isXLargeDesktop,
        } = context.conditions;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ParenDiv.current,
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1,
          },
        });

        if (isMediumDesktop) {
          tl.to(bglines.current, {
            height: "100vh",
            ease: "power3.inOut",
            duration: 2,
          })
            .to(headingEls, {
              y: "-800%",
              scale: 2.2,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(firstline, {
              y: "-800%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(secoundline, {
              y: "-900%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(headingEls, {
              y: "-1150%",
              scale: 1.5,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(bglines.current, {
              height: "0vh",
              ease: "power3.inOut",
              duration: 2,
            });
        } else if (isSmallDesktop) {
          tl.to(bglines.current, {
            height: "100vh",
            ease: "power3.inOut",
            duration: 2,
          })
            .to(headingEls, {
              y: "-750%",
              scale: 2.2,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(firstline, {
              y: "-800%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(secoundline, {
              y: "-900%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(headingEls, {
              y: "-1150%",
              scale: 1.5,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(bglines.current, {
              height: "0vh",
              ease: "power3.inOut",
              duration: 2,
            });
        } else if (isLargeDesktop || isXLargeDesktop) {
          tl.to(bglines.current, {
            height: "100vh",
            ease: "power3.inOut",
            duration: 2,
          })
            .to(headingEls, {
              y: "-850%",
              scale: 2.2,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(firstline, {
              y: "-800%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(secoundline, {
              y: "-900%",
              ease: "power3.inOut",
              duration: 4,
              stagger: 0.1,
            })
            .to(headingEls, {
              y: "-1150%",
              scale: 1.5,
              ease: "power3.inOut",
              duration: 1.7,
            })
            .to(bglines.current, {
              height: "0vh",
              ease: "power3.inOut",
              duration: 2,
            });
        }
      }
    );

    return () => mm.revert();
  });

  // Size definitions for depth effect
  const sizes = [
    {
      baseW: "w-[8%]",
      baseH: "h-[12vh]",
      lgW: "lg:w-[10%]",
      lgH: "lg:h-[25vh]",
    },
    {
      baseW: "w-[14%]",
      baseH: "h-[21vh]",
      lgW: "lg:w-[20%]",
      lgH: "lg:h-[56vh]",
    },
    {
      baseW: "w-[5%]",
      baseH: "h-[5vh]",
      lgW: "lg:w-[10%]",
      lgH: "lg:h-[23vh]",
    },
    {
      baseW: "w-[10%]",
      baseH: "h-[18vh]",
      lgW: "lg:w-[15%]",
      lgH: "lg:h-[34vh]",
    },
  ];
  const images = [imgone, imgtwo, imgthree, imgfour];

  return (
    <div ref={ParenDiv} className="w-full h-[200vh]">
      <div className="w-full relative h-screen flex flex-col justify-center items-center">
        <img
          ref={bglines}
          className="w-full h-0 absolute top-0 opacity-30 object-fill"
          src={backimage}
          alt="lines"
        />

        {/* Headings */}
        <div className="heading absolute 2xl:top-[120vh] xl:top-[100vh] lg:top-[120vh] lg:text-5xl lg:font-semibold z-40 2xl:text-7xl text-transparent [-webkit-text-stroke:0.1rem_white] mix-blend-overlay transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
          WHAT WE DO
        </div>
        <div className="heading absolute 2xl:top-[120vh] xl:top-[100vh] lg:top-[120vh] lg:text-5xl lg:font-semibold z-0 2xl:text-7xl bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
          WHAT WE DO
        </div>

        {/* FIRST GROUP – depth effect */}
        <div className="w-screen flex absolute lg:-bottom-[90vh] xl:-bottom-[70vh] 2xl:-bottom-[60vh] justify-around">
          {images.map((src, i) => {
            const { baseW, baseH, lgW, lgH } = sizes[i];
            return (
              <img
                key={`first-${i}`}
                src={src}
                alt={`slide-${i}`}
                className={`firstline relative ${
                  i === 1 ? "z-50" : "z-10"
                } rounded-3xl ${baseW} ${baseH} ${lgW} ${lgH} transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]`}
              />
            );
          })}
        </div>

        {/* SECOND GROUP – mirrored depth sizes */}
        <div className="w-screen flex absolute lg:-bottom-[70vh] -bottom-[85vh] justify-around">
          {images.map((src, i) => {
            // reverse sizes for second group
            const { baseW, baseH, lgW, lgH } = sizes.slice().reverse()[i];
            return (
              <img
                key={`second-${i}`}
                src={src}
                alt={`slide-second-${i}`}
                className={`secoundline ${
                  i === 2 ? "z-50" : "z-10"
                } relative z-10 rounded-3xl ${baseW} ${baseH} ${lgW} ${lgH} transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ElementComingUpAnimation;
