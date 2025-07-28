import React, { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

function FallingButtions() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const boxesRef = useRef([]);
  const mouseConstraintRef = useRef(null);
  const [boxPositions, setBoxPositions] = useState([]);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [isInView, setIsInView] = useState(0);

const [labels] = useState([
  "Gemstone",
  "Neural Network",
  "Ring",
  "Machine Learning",
  "Earrings",
  "AI Model",
  "Bracelet",
  "Algorithm",
  "Pendant",
  "Deep Learning",
  "Gold",
  "Silver",
  "Chatbot",
  "Diamond",
]);

  const createBoxes = (width, height, count) => {
    const boxWidth = width * 0.12;
    const boxHeight = height * 0.07;
    const boxes = [];
    for (let i = 0; i < count; i++) {
      const box = Matter.Bodies.rectangle(
        width * 0.9 + Math.random() * width * 0.3 - width * 0.15,
        -30 - i * 60,
        boxWidth,
        boxHeight,
        {
          chamfer: { radius: 20 },
          render: { fillStyle: "transparent" },
          restitution: 1,
          label: labels[i] || `Box ${i + 1}`,
        }
      );
      Matter.Body.setAngle(box, Math.random() * Math.PI * 2);
      boxes.push(box);
    }
    return { boxes, boxWidth, boxHeight };
  };

  useEffect(() => {
    const boxesCount = labels.length;
    const width = sceneRef.current?.clientWidth || 800;
    const height = sceneRef.current?.clientHeight || 600;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1;
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        background: "transparent",
        height,
        width,
        wireframes: false,
      },
    });
    renderRef.current = render;

    const ground = Matter.Bodies.rectangle(width / 2, height + 10, width, 50, {
      isStatic: true,
      render: { fillStyle: "transparent" },
    });
    const leftWall = Matter.Bodies.rectangle(0, height / 2, 1, height, {
      isStatic: true,
      render: { fillStyle: "transparent" },
    });
    const rightWall = Matter.Bodies.rectangle(width, height / 2, 1, height, {
      isStatic: true,
      render: { fillStyle: "transparent" },
    });

    const { boxes, boxWidth, boxHeight } = createBoxes(
      width,
      height,
      boxesCount
    );
    boxesRef.current = boxes;
    setBoxSize({ width: boxWidth, height: boxHeight });

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ...boxes]);

    // Mouse constraint
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      element: render.canvas,
      constraint: { stiffness: 0.2 },
      render: { visible: false },
    });
    Matter.World.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    render.mouse = mouse;

    // Intersection Observer to control animation
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsInView(
          isInView === 0 && entry.isIntersecting
            ? 1
            : isInView === 1
            ? 1
            : isInView
        );
      },
      { threshold: 0.1 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);

    let runner;
    let animationFrameId;

    const update = () => {
      setBoxPositions(
        boxesRef.current.map((box, i) => ({
          x: box.position.x,
          y: box.position.y,
          angle: box.angle,
          label: labels[i] || `Box ${i + 1}`,
        }))
      );
      animationFrameId = requestAnimationFrame(update);
    };

    if (isInView === 1) {
      Matter.Render.run(render);
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      update();
    }

    // Responsive handler
    const handleResize = () => {
      const newW = el.clientWidth;
      const newH = el.clientHeight;

      // Update renderer size
      render.options.width = newW;
      render.options.height = newH;
      render.canvas.width = newW;
      render.canvas.height = newH;

      // Clear and rebuild world
      Matter.World.clear(engine.world, false);
      const ng = Matter.Bodies.rectangle(newW / 2, newH + 25, newW, 50, {
        isStatic: true,
      });
      const nl = Matter.Bodies.rectangle(0, newH / 2, 1, newH, {
        isStatic: true,
      });
      const nr = Matter.Bodies.rectangle(newW, newH / 2, 1, newH, {
        isStatic: true,
      });

      // Rescale & recreate boxes
      const scaleX = newW / width;
      const scaleY = newH / height;
      const rebuilt = boxesRef.current.map((oldB) => {
        const nb = Matter.Bodies.rectangle(
          oldB.position.x * scaleX,
          oldB.position.y * scaleY,
          boxW * scaleX,
          boxH * scaleY,
          {
            chamfer: { radius: 20 },
            restitution: 1,
            render: { fillStyle: "transparent" },
            label: oldB.label,
          }
        );
        Matter.Body.setAngle(nb, oldB.angle);
        return nb;
      });
      boxesRef.current = rebuilt;
      setBoxSize({ width: boxW * scaleX, height: boxH * scaleY });
      Matter.World.add(engine.world, [ng, nl, nr, ...rebuilt]);

      // Recreate mouse constraint
      if (mouseConstraintRef.current) {
        Matter.World.remove(engine.world, mouseConstraintRef.current);
      }
      const m2 = Matter.Mouse.create(render.canvas);
      const mc2 = Matter.MouseConstraint.create(engine, {
        mouse: m2,
        element: render.canvas,
        constraint: { stiffness: 0.2 },
        render: { visible: false },
      });
      Matter.World.add(engine.world, mc2);
      mouseConstraintRef.current = mc2;
      render.mouse = m2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      if (runner) Matter.Runner.stop(runner);
    };
    // eslint-disable-next-line
  }, [labels, isInView]);

  return (
    <div
      className="w-screen h-[50vh] flex items-end pb-6 justify-center"
      style={{ position: "relative" }}
    >
      {/* Matter.js canvas and overlays */}
      <div
        ref={sceneRef}
        className="w-[95%] relative h-full rounded-4xl overflow-hidden bg-gradient-to-bl from-[#5A2E1F] via-[#b16c4e] to-[#5A2E1F]"
        style={{ zIndex: 1 }}
      >
        {/* Overlay HTML boxes */}
        {boxPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute bg-white/10 border-1 border-[#fff] rounded-3xl p-4 flex items-center justify-center font-bold text-[#222] select-none pointer-events-none"
            style={{
              left: `${pos.x - boxSize.width / 2}px`,
              top: `${pos.y - boxSize.height / 2}px`,
              width: boxSize.width,
              height: boxSize.height,
              transform: `rotate(${pos.angle}rad)`,
              boxSizing: "border-box",
              zIndex: 2,
            }}
          >
            <span className="truncate overflow-hidden text-ellipsis text-white text-center w-full whitespace-nowrap">
              {pos.label}
            </span>
          </div>
        ))}
      </div>

      {/* UI content OUTSIDE the physics/canvas container */}
      <div
        className="absolute left-0 top-0 w-full h-full flex justify-center items-start"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <div className="flex justify-center pl-20 pr-20 w-screen mt-[3%]">
          <div className="flex-2">
            <div className="text-4xl lg:text-3xl font-semibold text-white capitalize">
              Get discounts instantly
            </div>
            <div className="w-[70%] text-white lg:text-[0.7rem] text-sm mt-4">
              To save you just have to log in to your account and look for the
              experiences with the green or yellow color code. On your first
              reservation you can enjoy a 10% discount.
            </div>
            <div>
              <button
                className="bg-white text-[#222] lg:text-[0.7rem] font-bold py-2 mt-4 px-4 rounded-3xl"
                style={{ pointerEvents: "auto" }}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="flex-2 flex lg:text-[0.7rem] text-white">
            <div className="flex-1 flex flex-col">
              <span>Help and services</span>
              <span>How does it work</span>
              <span>FAQS</span>
              <span>Contact</span>
            </div>
            <div className="flex-1 flex flex-col">
              <span>Help and services</span>
              <span>How does it work</span>
              <span>FAQS</span>
              <span>Contact</span>
            </div>
            <div className="flex-1 flex flex-col">
              <span>Help and services</span>
              <span>How does it work</span>
              <span>FAQS</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FallingButtions;
