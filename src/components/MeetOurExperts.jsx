import { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";
import team3 from "../assets/team-3.jpg";
import team4 from "../assets/team-4.jpg";

function MeetOurExperts() {
  const empparentdiv = useRef(null);
  const containerRef = useRef(null);
  const teamsimage = [team1, team2, team3, team4];

  useGSAP(() => {
    const employees = containerRef.current.querySelectorAll(".employee");
    const employnames = gsap.utils.toArray(".employnames");

    employees.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        employees.forEach((target) => {
          if (target === el) {
            gsap.to(target, { flex: 2, ease: "power2.out", duration: 0.4 });
          } else {
            gsap.to(target, { flex: 0.7, ease: "power2.out", duration: 0.4 });
          }
        });
      });

      el.addEventListener("mouseleave", () => {
        employees.forEach((target) => {
          gsap.to(target, { flex: 1, ease: "power2.out", duration: 0.4 });
        });
      });
    });

    employees.forEach((el, index) => {
      el.addEventListener("mouseenter", () => {
        employnames.forEach((nameEl, nameIndex) => {
          if (index === nameIndex) {
            // Rotate hovered one to 45 degrees
            gsap.to(nameEl, {
              x: -80,
              rotate: 0,
              ease: "power2.out",
              duration: 0.4,
            });
          } else {
            // Keep others at 90 degrees
            gsap.to(nameEl, {
              x: 0,
              rotate: -90,
              ease: "power2.out",
              duration: 0.4,
            });
          }
        });
      });

      el.addEventListener("mouseleave", () => {
        // On mouse leave, reset all to 90 degrees
        gsap.to(employnames[index], {
          rotate: 90,
          x: 0,
          ease: "power2.out",
          duration: 0.4,
        });
      });
    });
  });

  return (
    <>
      <div ref={empparentdiv} className="w-full h-screen flex p-10 bg-white">
        <div className="flex w-1/3 text-black flex-col  bg-white">
          <span className="employetext 2xl:text-8xl lg:text-6xl mt-[18rem] lg:mt-[4rem] ml-[5rem] 2xl:leading-25 lg:leading-16 bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent">
            Meet Our Experts
          </span>
          <span className="employetext ml-[5rem] w-[70%] 2xl:text-lg lg:text-sm mt-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing tis neque? Ullam
            quam atque eos rerum ad error commodi mollitia modi quo ea.
          </span>
        </div>
        <div
          ref={containerRef}
          className="flex w-2/3 bg-white justify-between pr-8 pb-6 pt-6 pl-8 gap-4"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="employee relative  rounded-3xl border-1 border-gray-200 flex-1  transition-all duration-300 ease-in-out"
            >
              <div className="absolute bottom-10 left-4  font-semibold text-white uppercase flex flex-col ">
                <div className="employnames ml-20 -rotate-90 text-5xl">
                  {" "}
                  <span>david</span>
                  <span className="ml-3">Miller</span>
                </div>
              </div>
              <img
                className="w-full h-full object-cover rounded-3xl"
                src={teamsimage[i]}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MeetOurExperts;
