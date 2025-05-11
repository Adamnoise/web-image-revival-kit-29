
import React from "react";
import BackgroundEffects from "./BackgroundEffects";

interface PageBackgroundProps {
  variant?: "default" | "subtle" | "vibrant" | "cyber";
  animated?: boolean;
  className?: string;
}

const PageBackground = ({ 
  variant = "default", 
  animated = true,
  className
}: PageBackgroundProps) => {
  if (variant === "cyber") {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#070A14]"></div>
        
        {/* Grid background */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Horizontal lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-[1px] bg-[#00F5FF]/10"
              style={{ top: `${10 + i * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Vertical lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-full w-[1px] bg-[#00F5FF]/10"
              style={{ left: `${10 + i * 10}%` }}
            ></div>
          ))}
        </div>
        
        {/* Glowing spots */}
        <div className="absolute top-[20%] left-[15%] h-64 w-64 rounded-full bg-[#00F5FF]/5 filter blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] h-80 w-80 rounded-full bg-[#B026FF]/5 filter blur-3xl"></div>
        
        {/* Digital noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070A14] to-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-0 ${className || ''}`}>
      <BackgroundEffects variant={variant} animated={animated} />
    </div>
  );
};

export default PageBackground;
