import React, { useEffect, useRef, Suspense, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Model from "../components/Model";
import jewallery from "../assets/ring .glb";

gsap.registerPlugin(ScrollTrigger);

export default function OptimizedAboutUsPage() {
  const parentDiv = useRef(null);
  const modelGroupRef = useRef(null);
  const cameraRef = useRef(null);
  const firstCont = useRef(null);
  const secoundCont = useRef(null);
  const thirdCont = useRef(null);

  // Memoize animation configurations to prevent recreation
  const animationConfig = useMemo(() => ({
    ease: "cubic-bezier(0.19, 1, 0.2, 1)",
    duration: 1,
    stagger: 0.1
  }), []);

  // Memoized scroll trigger configurations
  const scrollTriggerConfigs = useMemo(() => ([
    {
      trigger: firstCont,
      start: "top 75%",
      end: "top 20%",
      scrub: 1,
      // Remove markers in production for better performance
      markers: false
    },
    {
      trigger: secoundCont,
      start: "top 75%",
      end: "top 20%",
      scrub: 1,
      markers: false
    },
    {
      trigger: thirdCont,
      start: "top 75%",
      end: "top 20%",
      scrub: 1,
      markers: false
    }
  ]), []);

  // Memoized camera settings
  const cameraSettings = useMemo(() => ({
    position: [0, 2, 5],
    fov: 50
  }), []);

  // Memoized WebGL settings
  const glSettings = useMemo(() => ({
    outputEncoding: THREE.sRGBEncoding,
    toneMapping: THREE.ACESFilmicToneMapping,
    powerPreference: "high-performance",
    antialias: false, // Disable for better performance
    alpha: true
  }), []);

  // Optimized animation setup function
  const setupAnimation = useCallback(() => {
    if (!modelGroupRef.current || !cameraRef.current || !parentDiv.current) {
      return;
    }

    // Cache DOM elements
    const headings = gsap.utils.toArray(".headinttext");
    const firstpara = gsap.utils.toArray(".firstpara");
    const secoundpara = gsap.utils.toArray(".secoundpara");
    const thirdpara = gsap.utils.toArray(".thirdpara");

    // Batch initial animations
    const initialTl = gsap.timeline();
    initialTl.to(headings, {
      marginTop: "6%",
      opacity: 1,
      duration: animationConfig.duration,
      stagger: animationConfig.stagger,
      ease: animationConfig.ease,
    });

    // Create optimized scroll timelines
    const timelines = [];

    // First section animation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        ...scrollTriggerConfigs[0],
        trigger: firstCont.current,
        invalidateOnRefresh: true, // Better performance on resize
        fastScrollEnd: true // Optimize for fast scrolling
      },
    });

    tl1.to(modelGroupRef.current.position, {
      x: -0.2,
      y: 0.4,
      ease: animationConfig.ease,
      duration: animationConfig.duration,
    })
    .to(firstpara, {
      marginLeft: "0%",
      opacity: 1,
      stagger: 0.4,
      ease: "power3.inOut",
    }, 0)
    .to(modelGroupRef.current.scale, {
      x: 0.2,
      y: 0.2,
      z: 0.2,
      ease: "power3",
    }, 0)
    .to(modelGroupRef.current.rotation, {
      y: THREE.MathUtils.degToRad(180),
      x: THREE.MathUtils.degToRad(29),
      z: THREE.MathUtils.degToRad(5),
      ease: "none",
    }, 0)
    .to(cameraRef.current.position, {
      z: 1,
      ease: "none",
    }, 0);

    // Second section animation
    const tl2 = gsap.timeline({
      scrollTrigger: {
        ...scrollTriggerConfigs[1],
        trigger: secoundCont.current,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      },
    });

    tl2.to(modelGroupRef.current.position, {
      x: 0.25,
      y: -0.8,
      ease: animationConfig.ease,
      duration: 2,
    })
    .to(secoundpara, {
      marginLeft: "12%",
      opacity: 1,
      stagger: 0.4,
      ease: "power3.inOut",
    }, 0)
    .to(modelGroupRef.current.scale, {
      x: 0.3,
      y: 0.3,
      z: 0.3,
      ease: animationConfig.ease,
      duration: 1,
    }, 0)
    .to(modelGroupRef.current.rotation, {
      y: THREE.MathUtils.degToRad(0),
      x: THREE.MathUtils.degToRad(20),
      z: THREE.MathUtils.degToRad(0),
      ease: "none",
      duration: 1,
    }, 0)
    .to(cameraRef.current.position, {
      z: 1,
      ease: "none",
    }, 0);

    // Third section animation
    const tl3 = gsap.timeline({
      scrollTrigger: {
        ...scrollTriggerConfigs[2],
        trigger: thirdCont.current,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      },
    });

    tl3.to(modelGroupRef.current.position, {
      x: -0.75,
      y: -5,
      ease: "power3",
      duration: 2,
    })
    .to(thirdpara, {
      marginLeft: "0%",
      opacity: 1,
      stagger: 0.4,
      duration: 1,
      ease: "power3.inOut",
    }, 0)
    .to(modelGroupRef.current.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      ease: animationConfig.ease,
      duration: 1,
    }, 0)
    .to(modelGroupRef.current.rotation, {
      y: THREE.MathUtils.degToRad(180),
      x: THREE.MathUtils.degToRad(15),
      z: THREE.MathUtils.degToRad(5),
      ease: animationConfig.ease,
      duration: 1,
    }, 0)
    .to(cameraRef.current.position, {
      z: 1,
      ease: animationConfig.ease,
      duration: 1,
    }, 0);

    timelines.push(tl1, tl2, tl3);
    return timelines;
  }, [animationConfig, scrollTriggerConfigs]);

  useEffect(() => {
    let timelines = [];
    let animationFrame;

    const initAnimation = () => {
      timelines = setupAnimation();
    };

    // Use requestAnimationFrame for better performance
    animationFrame = requestAnimationFrame(initAnimation);

    // Cleanup function
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      // Kill all timelines and ScrollTrigger instances
      timelines.forEach(tl => {
        if (tl) {
          tl.kill();
        }
      });
      
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Refresh ScrollTrigger to clean up any remaining instances
      ScrollTrigger.refresh();
    };
  }, [setupAnimation]);

  // Memoized lighting setup
  const lightingSetup = useMemo(() => (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024} // Reduced for better performance
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <Environment preset="warehouse" />
    </>
  ), []);

  return (
    <div
      ref={parentDiv}
      className="flex w-screen relative bg-[linear-gradient(120deg,_#fff_10%,_#ffe8cc_100%)]"
      style={{ overflowX: "hidden" }}
    >
      {/* Heading Text */}
      <div className="absolute w-full flex justify-center left-0 right-0 text-center top-9 z-10">
        {["A", "b", "o", "u", "t", "U", "s"].map((char, i) => (
          <div
            key={i}
            className={`headinttext xl:mt-30 lg:text-[9rem] xl:text-[14rem] 2xl:mt-70 2xl:text-[18rem] 
              opacity-0 font-normal bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] 
              bg-clip-text text-transparent ${i === 5 ? "ml-18" : ""}`}
            style={{
              display: "inline-block",
              marginLeft: i === 5 ? "2.7rem" : 0,
            }}
          >
            {char}
          </div>
        ))}
      </div>

      {/* Optimized Three.js Canvas */}
      <div className="w-screen flex flex-col items-center">
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0%",
            zIndex: "10",
          }}
          shadows
          camera={cameraSettings}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          gl={glSettings}
          frameloop="demand" // Only render when needed
          dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio for performance
        >
          {lightingSetup}
          
          <group
            ref={modelGroupRef}
            position={[0, 1.2, 0]}
            scale={[0.4, 0.4, 0.4]}
            frustumCulled={true} // Enable frustum culling
          >
            <Suspense fallback={null}>
              <Model
                url={jewallery}
                position={[0, 1.2, 0]}
                scale={[0.4, 0.4, 0.4]}
                rotation={[0, 0, 0]}
              />
            </Suspense>

            {/* Optimized shadow catching ground */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
              position={[0, 1.2, 0]}
              frustumCulled={true}
            >
              <planeGeometry args={[50, 50]} />
              <shadowMaterial opacity={0.1} /> {/* Reduced opacity for better performance */}
            </mesh>
          </group>
          
          <OrbitControls 
            target={[0, 0, 0]} 
            enableZoom={false}
            enableDamping={true} // Add damping for smoother interaction
            dampingFactor={0.1}
          />
        </Canvas>
        
        <div className="w-screen h-screen"></div>
        
        <div
          ref={firstCont}
          className="w-screen h-screen flex justify-end items-center"
        >
          <div className="w-[50%]">
            <div className="firstpara ml-80 opacity-0 2xl:text-[4rem] lg:text-[2.5rem] font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              About Us
            </div>
            <div className="firstpara ml-80 opacity-0 w-[80%] mt-6 bg-clip-text text-transparent bg-gradient-to-br from-[#8f6c4d] via-[#663e2d] to-[#3f2016] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              Elevate your jewelry design with GemAI—where AI meets elegance.
              Instantly generate photorealistic 3D models, from filigree rings
              to bespoke necklaces, refined with flawless precision. goodbye to
              manual modeling and hello to effortless innovation—unleash your
              creativity. with GemAI, the ultimate AI-powered jewelry studio
              <div className="mt-6">
                Elevate your jewelry design with GemAI—where AI meets elegance.
                Instantly generate photorealistic 3D models, from filigree rings
                to bespoke necklaces, refined with flawless precision. goodbye
                to manual modeling and hello to effortless innovation—unleash
                your creativity. with GemAI, the ultimate AI-powered jewelry
                studio
              </div>
            </div>
          </div>
        </div>
        
        <div
          ref={secoundCont}
          className="w-screen h-screen justify-start flex items-center"
        >
          <div className="w-[50%]">
            <div className="secoundpara opacity-0 2xl:text-[4rem] lg:text-[2.5rem] font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              Why Choose Us
            </div>
            <div className="secoundpara opacity-0 w-[80%] mt-6 bg-clip-text text-transparent bg-gradient-to-br from-[#8f6c4d] via-[#663e2d] to-[#3f2016] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              Elevate your jewelry design with GemAI—where AI meets elegance.
              Instantly generate photorealistic 3D models, from filigree rings
              to bespoke necklaces, refined with flawless precision. goodbye to
              manual modeling and hello to effortless innovation—unleash your
              creativity. with GemAI, the ultimate AI-powered jewelry studio
              <div className="mt-6">
                Elevate your jewelry design with GemAI—where AI meets elegance.
                Instantly generate photorealistic 3D models, from filigree rings
                to bespoke necklaces, refined with flawless precision. goodbye
                to manual modeling and hello to effortless innovation—unleash
                your creativity. with GemAI, the ultimate AI-powered jewelry
                studio
              </div>
            </div>
          </div>
        </div>
        
        <div
          ref={thirdCont}
          className="w-screen h-screen flex bg-amber-50 justify-end items-center"
        >
          <div className="w-[50%]">
            <div className="thirdpara ml-90 opacity-0 lg:text-[2.5rem] 2xl:text-[4rem] font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[#D4A276] via-[#A16247] to-[#5A2E1F] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              Our Brand Promise
            </div>
            <div className="thirdpara ml-90 opacity-0 w-[80%] mt-6 bg-clip-text text-transparent bg-gradient-to-br from-[#8f6c4d] via-[#663e2d] to-[#3f2016] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.2,1)]">
              Elevate your jewelry design with GemAI—where AI meets elegance.
              Instantly generate photorealistic 3D models, from filigree rings
              to bespoke necklaces, refined with flawless precision. goodbye to
              manual modeling and hello to effortless innovation—unleash your
              creativity. with GemAI, the ultimate AI-powered jewelry studio
              <div className="mt-6">
                Elevate your jewelry design with GemAI—where AI meets elegance.
                Instantly generate photorealistic 3D models, from filigree rings
                to bespoke necklaces, refined with flawless precision. goodbye
                to manual modeling and hello to effortless innovation—unleash
                your creativity. with GemAI, the ultimate AI-powered jewelry
                studio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}