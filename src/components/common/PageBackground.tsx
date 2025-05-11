
import React from "react";

interface PageBackgroundProps {
  variant?: "default" | "subtle" | "gradient";
  className?: string;
}

const PageBackground = ({ 
  variant = "default", 
  className
}: PageBackgroundProps) => {
  if (variant === "gradient") {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black"></div>
        
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    );
  }
  
  if (variant === "subtle") {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-0 bg-black ${className || ''}`}></div>
  );
};

export default PageBackground;
