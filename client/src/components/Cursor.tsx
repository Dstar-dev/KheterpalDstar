import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      // Check if cursor is over clickable element
      const target = event.target as Element;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("hover-trigger")
      );
    };

    const mouseDownHandler = () => setIsClicking(true);
    const mouseUpHandler = () => setIsClicking(false);
    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("mouseleave", mouseLeaveHandler);
    document.addEventListener("mouseenter", mouseEnterHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mouseleave", mouseLeaveHandler);
      document.removeEventListener("mouseenter", mouseEnterHandler);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed z-50 w-8 h-8 pointer-events-none rounded-full border-2 border-accent"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
          borderColor: isPointer ? "rgb(236, 72, 153)" : "rgb(34, 211, 238)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.05,
          stiffness: 400,
          damping: 10,
          duration: 0.05,
        }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed z-50 w-2 h-2 pointer-events-none rounded-full bg-highlight"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.02,
          stiffness: 500,
          damping: 8,
          duration: 0.03,
        }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default Cursor;
