import React, { useState } from "react";
import { StaggeredText } from "./TextAnimate";
import { motion, AnimatePresence } from "framer-motion";

const backgrounds = ["green", "lightblue", "orange"];
const texts = ["hello", "good bye", "see you later"];

const TestAnimation = () => {
  const [index, setIndex] = useState(0);
  const [style, setStyle] = useState({ transform: "translate(0, 0)" });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.2s ease" });
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index} // Ensures re-render for smooth animation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backgroundColor: backgrounds[index] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "100px", position: "relative", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handlePrev}
          style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
        >
          PREVIOUS
        </button>
        <motion.h1
          className="text-center"
          style={{
            ...style,
            transition: "transform 0.1s ease",
            textAlign: "center",
          }}
        >
          <StaggeredText key={texts[index]} text={texts[index]} />
        </motion.h1>
        <button
          onClick={handleNext}
          style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
        >
          NEXT
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default TestAnimation;
