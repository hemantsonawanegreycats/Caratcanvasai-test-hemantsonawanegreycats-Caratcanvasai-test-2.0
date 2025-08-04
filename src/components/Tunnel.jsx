import { useEffect, useRef } from "react";

export default function Tunnel({ count = 50, spacing = 200 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      Array.from(containerRef.current.children).forEach((el, i) => {
        const baseZ = -i * spacing;
        const zOffset = (scrollY / 5) % (count * spacing);
        console.log(`Element ${i}: baseZ=${baseZ}, zOffset=${zOffset}`);
        el.style.transform = `translateZ(${baseZ + zOffset }px)`;
        el.style.opacity =
          1 - Math.min(Math.abs(baseZ + zOffset) / (count * spacing), 1);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [count, spacing]);

  return (
    <div className="h-screen overflow-auto bg-gray-900 perspective-1000">
      <div
        ref={containerRef}
        className="relative mx-auto w-64 h-64 preserve-3d"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 w-48 h-32 mx-auto my-auto
              bg-gradient-to-r from-indigo-500 to-pink-500
              rounded-lg shadow-xl
              transition-transform duration-300
              ${i % 4 ? "rotate-y-30" : "-rotate-y-20"}
            `}
            style={{
              transform: `translateZ(${-i * spacing}px)`,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
