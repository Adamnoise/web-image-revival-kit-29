
import React from "react";
import BackgroundEffects from "./BackgroundEffects";

interface PageBackgroundProps {
  variant?: "default" | "subtle" | "vibrant" | "cyber" | "gradient";
  animated?: boolean;
  className?: string;
}

const PageBackground = ({ 
  variant = "default", 
  animated = false,
  className
}: PageBackgroundProps) => {
  if (variant === "gradient") {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151926] via-[#13151f] to-[#101219]"></div>
      </div>
    );
  }

  if (variant === "cyber" || variant === "vibrant") {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#101219]"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsIDExNiwgMjQwLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Subtle glow */}
        {variant === "vibrant" && (
          <>
            <div className="absolute top-[20%] left-[15%] h-64 w-64 rounded-full bg-primary/5 filter blur-3xl"></div>
            <div className="absolute bottom-[30%] right-[15%] h-80 w-80 rounded-full bg-primary/5 filter blur-3xl"></div>
          </>
        )}
        
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#101219] to-transparent"></div>
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
