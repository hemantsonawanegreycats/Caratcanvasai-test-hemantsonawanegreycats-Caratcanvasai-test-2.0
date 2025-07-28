// FooterAnimation.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const keywords = [
  "Quickly",
  "Personalized",
  "Accelerate",
  "Fantastic",
  "Increase response",
  "Awesome!",
  "Amazing!",
  "Easily integrate"
];

export default function Footer() {
  const kwTextRef = useRef(null);
  const cursorRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Reveal keywords line & blink cursor
    tl.set([kwTextRef.current, cursorRef.current], { opacity: 1 });
    tl.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5
    }, 0);

    // Cycle each keyword
    keywords.forEach((word, i) => {
      tl.to(kwTextRef.current, {
        duration: 0.8,
        text: { value: word, delimiter: "" },
        ease: "none"
      }, i * 1.2 + 0.5);
      tl.to(kwTextRef.current, {
        opacity: 0,
        duration: 0.3
      }, i * 1.2 + 1.3);
      tl.set(kwTextRef.current, { opacity: 1 }, i * 1.2 + 1.6);
    });

    // Fade out keywords, drop in headline & subtext
    tl.to([kwTextRef.current, cursorRef.current], { opacity: 0, duration: 0.5 }, "+=0.5");
    tl.fromTo(headlineRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "bounce.out" }
    );
    tl.fromTo(subtextRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 },
      "<"
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-6 overflow-hidden text-gray-500 text-lg mb-4 flex items-center">
        <span ref={kwTextRef} className="whitespace-nowrap"></span>
        <span ref={cursorRef} className="inline-block w-1 bg-black ml-1"></span>
      </div>
      <h1
        ref={headlineRef}
        className="text-4xl font-bold text-gray-900 opacity-0"
      >
        Potion videos where you work
      </h1>
      <p
        ref={subtextRef}
        className="mt-4 text-center text-gray-600 max-w-xl opacity-0"
      >
        Potion videos easily integrate with your entire toolkit. Boost team
        performance, close more deals, generate more leads and engage customers
        using Potion videos.
      </p>
    </div>
  );
}
