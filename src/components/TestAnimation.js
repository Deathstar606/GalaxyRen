import React, { useState } from "react";

const TestAnimation = () => {
  const [style, setStyle] = useState({ transform: "translate(0, 0)" });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -10; // -10 to +10 range
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10; // -10 to +10 range

    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.2s ease" });
  };

  return (
    <div
      style={{ backgroundColor: "lightblue", padding: "100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h1
        className="text-center"
        style={{
          ...style,
          transition: "transform 0.1s ease", // Smooth transition
        }}
      >
        Test Animation
      </h1>
    </div>
  );
};

export default TestAnimation;
