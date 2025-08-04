import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedGradientBorder({ children }) {
  const borderRef = useRef(null);

  useEffect(() => {
    const borderEl = borderRef.current;
    // Animate CSS variable for background position
    gsap.to(borderEl, {
      "--angle": 360,
      duration: 6,
      repeat: -1,
      ease: "linear",
      modifiers: {
        "--angle": gsap.utils.unitize(value => parseFloat(value) % 360),
      },
    });
  }, []);

  return (
    <div
      ref={borderRef}
      className="relative w-auto p-2 rounded-xl"
      style={{
        "--angle": 0,
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          borderRadius: "1rem",
          padding: 0,
          background: "conic-gradient(from var(--angle,0deg), #ff7a18, #af002d 30%, #319197 55%, #ff7a18 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        }}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">{children}</div>
    </div>
  );
}
