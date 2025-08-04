import logo from "../assets/caratcanvas logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router";

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
      <div className="fixed top-5 bg-white/85 shadow-sm backdrop-blur-md rounded-full left-0 right-0 z-50 mx-auto w-[90vw] h-20 flex items-center  ">
        {/* Left Links */}
        <div className="flex flex-1 font-normal text-[#5A2E1F] justify-around">
          <Link to={"/"} className="options font-medium h-1 text-[#5A2E1F]  rounded-full">
            Home
            <div className="w-full h-1 bg-[#e68261] rounded-full"></div>
          </Link>
          <Link to={"/shop"}>
          <div className="options">Shop</div>
          </Link>
          <Link to={"/about-us"} className="options">About</Link>
        </div>

        {/* Logo */}
        <div ref={logoref} className="flex flex-1 justify-center items-center">
          <img className="logo w-1/2" src={logo} alt="" />
        </div>

        {/* Right Links */}
        <div className="flex flex-1 justify-around font-normal text-[#5A2E1F]">
          <Link to={"/contact"} className="rightoptions">
            Contact
          </Link>
          <div className="rightoptions">My Profile</div>
          <div className="rightoptions  flex items-center justify-center rounded-3xl ">
            Sign Out
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
