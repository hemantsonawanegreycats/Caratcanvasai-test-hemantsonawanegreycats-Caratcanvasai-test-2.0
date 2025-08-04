import bgimage from "../assets/images/bg_01.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function ContactPage() {
  //   const HeadingText = useRef(null);

  useGSAP(() => {
    const headintText = gsap.utils.toArray(".headinttext");
    const forminputs = gsap.utils.toArray(".forminputs");
    const lefttexts = gsap.utils.toArray(".lefttexts");
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();

    mm.add(
      {
        isSmall: "(min-width:1024px) and (min-width:1439px)",
        isMedium: "(min-width:1024px) and (max-width:1439px)", // tablets & small desktops
        isLarge: "(min-width:1440px)", // large desktops
      },
      (ctx) => {
        const { isLarge, isMedium, isSmall } = ctx.conditions;

        if (isLarge) {
          tl.to(
            headintText,
            {
              ease: "power3",
              marginTop: "3%",
              duration: 1,
              stagger: 0.1,
              alpha: 1,
            },
            "1"
          );

          tl.to(
            forminputs,
            {
              ease: "power3.inOut",
              marginTop: "0%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "1.5"
          );

          tl.to(
            lefttexts,
            {
              ease: "power3.inOut",
              marginTop: "5%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "<"
          );
        } else if (isMedium) {
          tl.to(
            headintText,
            {
              ease: "power3",
              marginTop: "6%",
              duration: 1,
              stagger: 0.1,
              alpha: 1,
            },
            "1"
          );

          tl.to(
            forminputs,
            {
              ease: "power3.inOut",
              marginTop: "0%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "1.5"
          );

          tl.to(
            lefttexts,
            {
              ease: "power3.inOut",
              marginTop: "5%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "<"
          );
        } else if (isSmall) {
          tl.to(
            headintText,
            {
              ease: "power3",
              marginTop: "3%",
              duration: 1,
              stagger: 0.1,
              alpha: 1,
            },
            "1"
          );

          tl.to(
            forminputs,
            {
              ease: "power3.inOut",
              marginTop: "0%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "1.5"
          );

          tl.to(
            lefttexts,
            {
              ease: "power3.inOut",
              marginTop: "5%",
              duration: 1,
              alpha: 1,
              stagger: 0.1,
            },
            "<"
          );
        }
      }
    );
  });

  return (
    <>
      <div
        className="w-screen  "
        style={{ backgroundImage: `url(${bgimage})`, backgroundSize: "cover" }}
      >
        <div className="w-full flex justify-center  ">
          {" "}
          {["C", "o", "n", "t", "a", "c", "t", "U", "s"].map((char, i) => {
            return (
              <div
                className={`headinttext xl:mt-30 lg:mt-30 lg:text-[9rem] xl:text-[14rem] 2xl:mt-60 opacity-0 2xl:text-[18rem] font-normal bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent ${
                  i === 7 ? "ml-18" : ""
                } `}
              >
                {char}
              </div>
            );
          })}
        </div>
        <div className="flex w-screen px-28 pb-16">
          <div className="flex-1">
            <div className="lefttexts opacity-0 mt-20 capitalize lg:text-xl xl:text-2xl xl:w-[35%] 2xl:text-3xl lg:w-[50%] w-[30%] font-medium bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] bg-clip-text text-transparent mb-12">
              don't afraid to say hello with us!
            </div>
            <div className="w-[50%] xl:w-[70%]">
              <div className="lefttexts opacity-0 mt-20 flex flex-col ">
                <span className="font-medium lg:text-[0.8rem] xl:text-[0.9rem] 2xl:text-sm text-[#D4A276]">
                  Phone
                </span>{" "}
                <span className=" font-medium  lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.05rem] mt-1 text-[#5A2E1F] ">
                  +91 9898 9876 00
                </span>
              </div>
              <div className="lefttexts opacity-0 mt-20 flex flex-col ">
                <span className="font-medium lg:text-[0.8rem] xl:text-[0.9rem] text-sm text-[#D4A276]">
                  Email
                </span>{" "}
                <span className="font-medium lg:text-[0.8rem] xl:text-[1rem]  2xl:text-[1.05rem] mt-1 text-[#5A2E1F]">
                  temp@email.com
                </span>
              </div>
              <div className="lefttexts opacity-0 mt-20 flex flex-col ">
                <span className="font-medium lg:text-[0.8rem] xl:text-[0.9rem] text-sm text-[#D4A276]">
                  Address
                </span>{" "}
                <span className="font-medium lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.05rem] mt-1 text-[#5A2E1F]">
                  123 Main Street, Anytown, CA 91234. Addresses typically
                  include a house number, street name, city, state, and postal
                  code
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 ">
            <form className="w-full z-50 ">
              <div className="flex justify-center ">
                <div className="forminputs opacity-0 mt-20  flex-1 flex flex-col lg:p-2 lg:mb-2  2xl:p-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
                  <span className="font-medium text-primary 2xl:text-[1rem] lg:text-[0.9rem]">
                    Name
                  </span>
                  <input
                    className="border-1 lg:text-[0.8rem] border-b-1 border-t-0 border-l-0 border-r-0 outline-none mt-4"
                    type="text"
                    name="Name"
                    id=""
                  />
                </div>
                <div className="forminputs opacity-0 mt-20  flex-1 flex flex-col lg:mb-2 lg:p-2 2xl:p-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
                  <span className="font-medium text-primary 2xl:text-[1rem] lg:text-[0.9rem]">
                    Email
                  </span>
                  <input
                    className="border-1 lg:text-[0.8rem] border-b-primary border-b-1 border-t-0 border-l-0 border-r-0 outline-none mt-4"
                    type="email"
                    name="Name"
                    id=""
                  />
                </div>
              </div>

              <div className="flex">
                <div className="forminputs opacity-0 mt-20 lg:mb-2 flex-1 flex 2xl:p-4 flex-col lg:p-2 p-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
                  <span className="font-medium text-primary 2xl:text-[1rem] lg:text-[0.9rem]">
                    Phone
                  </span>
                  <input
                    className="border-1 lg:text-[0.8rem] border-b-primary border-b-1 border-t-0 border-l-0 border-r-0 outline-none mt-4 focus:outline-none [
    appearance:textfield
  ] [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    name="Phone"
                    id=""
                  />
                </div>
                <div className="forminputs opacity-0 mt-20 2xl:p-4 flex-1 flex flex-col lg:p-2 p-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
                  <span className="font-medium text-primary 2xl:text-[1rem] lg:text-[0.9rem]">
                    Subject
                  </span>
                  <input
                    className="border-1 lg:text-[0.8rem] border-b-primary border-b-1 border-t-0 border-l-0 border-r-0 outline-none mt-4"
                    type="text"
                    name="Subject"
                    id=""
                  />
                </div>
              </div>

              <div className="flex">
                <div className="forminputs opacity-0 2xl:p-4 mt-20  flex-1 flex flex-col lg:p-2 p-4 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]">
                  <span className="font-medium text-primary 2xl:text-[1rem] lg:text-[0.9rem]">
                    Description
                  </span>
                  <textarea
                    className="border-1 lg:text-[0.8rem] resize-none  border-b-primary border-b-1 border-t-0 border-l-0 border-r-0 outline-none mt-4"
                    type="text"
                    name="dec"
                    id=""
                  />
                </div>
              </div>
              <div className="flex p-4">
                <button
                  type="submit"
                  className="forminputs opacity-0 mt-20  px-7 py-3 bg-[#A16247] text-white font-medium rounded-full transition-all duration-800 ease-[cubic-bezier(0.19,1,0.2,1)]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ContactPage;
