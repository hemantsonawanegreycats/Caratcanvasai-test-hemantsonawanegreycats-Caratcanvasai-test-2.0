import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import FallingButtons from "./FallingButtons";
import image1 from "../assets/slide-image-1.jpg";
import image2 from "../assets/slide-image-2.jpg";
import image3 from "../assets/slide-image-3.jpg";
import image4 from "../assets/slide-image-4.jpg";
// Note: 'fadeIn' import is not needed here if you use "fade-in" class directly in JSX

// import { fadeIn } from "../animations/index.js"; // can be removed if not used
import SplashCursor from "../SplashCursor/SplashCursor"; // optional
import { useEffect, useState } from "react";

export default function RouterLayout() {
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    function onPointerMove(e) {
      const tag = e.target.tagName;
      const editable = e.target.isContentEditable;
      // Disable when over inputs, textareas, or contentEditable
      setCursorEnabled(!(tag === "INPUT" || tag === "TEXTAREA" || editable));
    }
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div className="relative  bg-[#f8eee8]">
      <NavBar />

      {/* Only render SplashCursor when cursorEnabled is true */}
      {cursorEnabled && (
        <SplashCursor SIM_RESOLUTION={20} DYE_RESOLUTION={200} />
      )}

      <Outlet />
      <FallingButtons />
    </div>
  );
}
