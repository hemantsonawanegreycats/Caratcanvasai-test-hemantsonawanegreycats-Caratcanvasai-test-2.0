import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import gsap from "gsap";

function PromptInput({ prompt = "" }) {
  const [inputValue, setInputValue] = useState(prompt);
  const [roundedRef, setRoundedRef] = useState("rounded-2xl");
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isEmptyOrSpaces(inputValue)) {
      const ta = textareaRef.current;
      const pa = containerRef.current;

      if (ta && pa) {
        ta.style.height = "40px"; // Reset textarea to original height
        pa.style.height = "80px"; // Reset container to original height
        setRoundedRef("rounded-2xl"); // Reset border radius
      }
    }
  }, [inputValue]);

  function isEmptyOrSpaces(str) {
    return str.trim() === "";
  }

  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);

    const ta = textareaRef.current;
    const pa = containerRef.current;

    if (ta && pa) {
      // Always reset height first
      ta.style.height = "auto";

      const scrollHeight = ta.scrollHeight;
      const minContainerHeight = 80;
      const paddingHeight = 32;

      // Set new heights
      ta.style.height = scrollHeight + "px";
      pa.style.height =
        Math.max(scrollHeight + paddingHeight, minContainerHeight) + "px";

      // Handle border radius changes
      if (!isEmptyOrSpaces(value)) {
        setRoundedRef("rounded-3xl");
      } else {
        setRoundedRef("rounded-2xl");
        // Force reset when empty
        ta.style.height = "40px";
        pa.style.height = minContainerHeight + "px";
      }
    }
  }

  return (
    <div className="w-full max-w-full ">
      <div
        ref={containerRef}
        className={`
          ${roundedRef}
          w-full 
          min-h-[80px]
          flex 
      
  
        shadow-primary-md
          transition-all 
          duration-300
          p-4
          gap-4
        `}
      >
        {/* Plus Icon */}
        <div className="flex items-end ">
          <GoPlusCircle className="text-2xl pb-2 sm:text-3xl lg:text-4xl text-[#e68261] cursor-pointer hover:text-[#d67550] transition-colors flex-shrink-0" />
        </div>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          className="
            flex-1
           no-scrollbar
            outline-none 
            resize-none
            bg-transparent
            text-base sm:text-lg lg:text-lg flex items-center border-0
            font-semibold 
            text-[#e68261] 
            placeholder:text-[#e68261]/60
            focus-visible:ring-0 
            focus-visible:ring-offset-0 
            focus-visible:outline-none p-1
            pt-3
            min-h-[40px]
          "
          placeholder="Type prompt here..."
          rows={1}
        />

        {/* Generate Button */}
        <div className="flex  ">
          <button
            className="
            flex 
            items-center 
            justify-center 
            gap-2
            text-sm sm:text-base
            font-semibold
            py-3 sm:py-4
            px-4 sm:px-6 
            rounded-xl 
            bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]
            text-white
            hover:shadow-lg
            transition-all
            duration-200
            active:scale-95
            flex-shrink-0
            mt-auto
          "
          >
            <BsStars className="text-lg sm:text-xl" />
            <span className="hidden sm:inline">Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptInput;
