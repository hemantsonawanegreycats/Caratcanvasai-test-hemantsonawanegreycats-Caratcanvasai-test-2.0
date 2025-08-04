// src/components/ui/image-cursortrail.jsx
//@ts-nocheck
import React, { createRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils.js";

export default function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false
}) {
  const containerRef = useRef(null);
  const refs = useRef(items.map(() => createRef()));

  // Persist stateful values across renders
  const globalIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const currentZIndexRef = useRef(1);

  const activate = (imageEl, x, y) => {
    const rect = containerRef.current.getBoundingClientRect();
    const relX = x - rect.left;
    const relY = y - rect.top;

    imageEl.style.left = `${relX}px`;
    imageEl.style.top = `${relY}px`;

    if (currentZIndexRef.current > 1000) {
      currentZIndexRef.current = 1;
    }
    imageEl.style.zIndex = String(currentZIndexRef.current++);
    imageEl.dataset.status = "active";

    if (fadeAnimation) {
      setTimeout(() => {
        imageEl.dataset.status = "inactive";
      }, 1500);
    }

    lastPosRef.current = { x, y };
  };

  const deactivate = (imageEl) => {
    imageEl.dataset.status = "inactive";
  };

  const handleOnMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const { x: lx, y: ly } = lastPosRef.current;
    const dx = x - lx;
    const dy = y - ly;

    if (Math.hypot(dx, dy) > distance) {
      const gi = globalIndexRef.current;
      const leadIndex = gi % refs.current.length;
      const tailIndex = (gi - maxNumberOfImages + refs.current.length) % refs.current.length;

      const leadEl = refs.current[leadIndex].current;
      const tailEl = refs.current[tailIndex].current;

      if (leadEl) activate(leadEl, x, y);
      if (tailEl) deactivate(tailEl);

      globalIndexRef.current++;
    }
  };

  // Ensure listeners attach once
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    node.addEventListener("mousemove", handleOnMove);
    node.addEventListener("touchmove", (ev) => handleOnMove(ev.touches[0]));

    return () => {
      node.removeEventListener("mousemove", handleOnMove);
      node.removeEventListener("touchmove", (ev) => handleOnMove(ev.touches[0]));
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
    >
      {items.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          ref={refs.current[i]}
          data-status="inactive"
          className={cn(
            // Correct Tailwind syntax for opacity and transitions
            "absolute -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all duration-300 data-[status='active']:scale-100 data-[status='active']:opacity-100",
            imgClass
          )}
        />
      ))}
      {children}
    </section>
  );
}
