import { useState } from "react";
import image1 from "../assets/slide-image-1.jpg";
import image2 from "../assets/slide-image-2.jpg";
import image3 from "../assets/slide-image-3.jpg";
import image4 from "../assets/slide-image-4.jpg";
import { Button } from "./ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IMAGES = [
  {
    id: "necklace-1",
    label: "Elegant Diamond Necklace",
    src: image1,
    link: "#necklace-1",
  },
  {
    id: "ring-1",
    label: "Classic Solitaire Ring",
    src: image2,
    link: "#ring-1",
  },
  {
    id: "bracelet-1",
    label: "Gold Bangle Bracelet",
    src: image3,
    link: "#bracelet-1",
  },
  {
    id: "earrings-1",
    label: "Pearl Drop Earrings",
    src: image4,
    link: "#earrings-1",
  },
  {
    id: "necklace-2",
    label: "Vintage Kundan Necklace",
    src: image1,
    link: "#necklace-2",
  },
  {
    id: "ring-2",
    label: "Antique Polki Ring",
    src: image2,
    link: "#ring-2",
  },
  {
    id: "bracelet-2",
    label: "Diamond Tennis Bracelet",
    src: image3,
    link: "#bracelet-2",
  },
  {
    id: "earrings-2",
    label: "Emerald Stud Earrings",
    src: image4,
    link: "#earrings-2",
  },
  {
    id: "necklace-3",
    label: "Layered Gold Chain",
    src: image1,
    link: "#necklace-3",
  },
  {
    id: "ring-3",
    label: "Sapphire Cocktail Ring",
    src: image2,
    link: "#ring-3",
  },
  {
    id: "bracelet-3",
    label: "Rose Gold Cuff",
    src: image3,
    link: "#bracelet-3",
  },
  {
    id: "earrings-3",
    label: "Diamond Hoop Earrings",
    src: image4,
    link: "#earrings-3",
  },
  {
    id: "necklace-4",
    label: "Ruby Pendant Necklace",
    src: image1,
    link: "#necklace-4",
  },
  {
    id: "ring-4",
    label: "Platinum Wedding Band",
    src: image2,
    link: "#ring-4",
  },
  {
    id: "bracelet-4",
    label: "Beaded Gemstone Bracelet",
    src: image3,
    link: "#bracelet-4",
  },
];

export default function MasonryGallery() {
  const [hoveredItem, setHoveredItem] = useState(null);

  useGSAP(() => {
    const imagecontainer = gsap.utils.toArray(".imagecontainer");

    imagecontainer.forEach((el, index) => {
      el.addEventListener("mouseenter", () => {
        // Scale up hovered element
        gsap.to(el, {
          scale: 1.1,
          duration: 1,
          ease: "power3.inOut",
        });

        // Scale down + fade + move other elements away
        imagecontainer.forEach((el2, i) => {
          if (el !== el2) {
            // Move left if before hovered, right if after
            const offset = (i < index ? -1 : 1) * 20; // 20px shift
            gsap.to(el2, {
              scale: 0.95,
              opacity: 0.5,
              x: offset,
              y:offset,
              duration: 1,
              ease: "power3.inOut",
            });
          }
        });
      });

      el.addEventListener("mouseleave", () => {
        // Restore hovered element
        gsap.to(el, {
          scale: 1,
          duration: 1,
          ease: "power3.inOut",
        });

        // Restore others to normal position and appearance
        imagecontainer.forEach((el2) => {
          if (el !== el2) {
            gsap.to(el2, {
              scale: 1,
              opacity: 1,
              x: 0,
              y:0,
              duration: 1,
              ease: "power3.inOut",
            });
          }
        });
      });
    });
  });

  return (
    <div className="w-full">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3">
        {IMAGES.map((item) => (
          <div
            key={item.id}
            className="imagecontainer relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer aspect-[3/4]"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className={`
              absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
              flex flex-col justify-end p-4
              transition-opacity duration-300
              ${hoveredItem === item.id ? "opacity-100" : "opacity-0"}
            `}
            >
              <h3 className="text-white font-semibold text-sm mb-3 text-center">
                {item.label}
              </h3>
              <Button
                size="sm"
                className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
