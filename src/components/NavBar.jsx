import logo from "../assets/caratcanvas logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function NavBar() {
  const logoref = useRef(null);
  useGSAP(() => {
    const leftoptions = gsap.utils.toArray(".options");
    const rightoptions = gsap.utils.toArray(".rightoptions").reverse();

    gsap.fromTo(
      leftoptions,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        duration: 2,
        opacity: 1,
        ease: "power3.out",
        scrub: 1,
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      logoref.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        duration: 1.8,
        opacity: 1,
        ease: "power3.out",
        scrub: 1,
      }
    );

    gsap.fromTo(
      rightoptions,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        duration: 2,
        opacity: 1,
        ease: "power3.out",
        scrub: 1,
        stagger: 0.2,
      }
    );
  });

  return (
    <>
      <div className="w-screen flex h-24 items-center ">
        <div className=" flex justify-around flex-1/3">
          <div className="options">Link 1</div>
          <div className="options">Link 2</div>
          <div className="options">Link 3</div>
        </div>

        <div
          ref={logoref}
          className="flex-1/3 flex justify-center items-center"
        >
          <img className=" logo w-[50%]" src={logo} alt="" />
        </div>

        <div className="flex justify-around flex-1/3">
          <div className="rightoptions">Link 1</div>
          <div className="rightoptions">Link 2</div>
          <div className="bg-[#A16247] rightoptions  w-26 h-10 flex items-center justify-center rounded-3xl text-white">
            Link 3
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
