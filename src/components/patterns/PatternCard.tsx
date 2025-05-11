
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface PatternCardProps {
  title: string;
  description: string;
  color: string;
  secondaryColor?: string;
  index: number;
  icon?: React.ReactNode;
  complexity?: number;
  count?: number;
  effectivity?: number;
}

const PatternCard = ({ 
  title, 
  description, 
  color, 
  secondaryColor, 
  index, 
  icon, 
  complexity = 5,
  count = 0,
  effectivity = 0
}: PatternCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D rotation effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Spring physics for smoother rotation
  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center
    const xValue = e.clientX - rect.left - width / 2;
    const yValue = e.clientY - rect.top - height / 2;
    
    // Update motion values
    x.set(xValue);
    y.set(yValue);
  };
  
  const resetCardPosition = () => {
    x.set(0);
    y.set(0);
  };

  // Generate a path for the circuit lines based on the card's properties
  const generateCircuitPath = () => {
    const baseComplexity = Math.min(complexity, 10) / 10; // Normalized 0-1
    const paths = [
      `M10,${50 + baseComplexity * 20} L${30 + baseComplexity * 10},${50 - baseComplexity * 10} L${30 + baseComplexity * 20},20 L${60 + baseComplexity * 20},${20 + baseComplexity * 5} L${60 + baseComplexity * 10},${40 - baseComplexity * 10} L90,${40 + baseComplexity * 20}`,
      `M20,90 L20,${70 + baseComplexity * 10} L${40 + baseComplexity * 15},${70 - baseComplexity * 5} L${40 + baseComplexity * 5},${50 + baseComplexity * 10} L${70 - baseComplexity * 10},${50 - baseComplexity * 5} L${70 + baseComplexity * 5},${80 + baseComplexity * 10} L90,${80 - baseComplexity * 15}`
    ];
    return paths;
  };

  const circuitPaths = generateCircuitPath();
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-[320px] w-full overflow-hidden rounded-md",
        "hover:shadow-2xl transition-all duration-300 cursor-pointer",
        "border-4 border-black dark:border-[#111] group"
      )}
      style={{
        backgroundColor: `${color}11`,
        boxShadow: isPressed 
          ? `3px 3px 0 0 rgba(0, 0, 0, 0.8)` 
          : `${8 + index % 4}px ${8 + index % 4}px 0 0 rgba(0, 0, 0, 0.8)`,
        transform: isPressed ? 'translateY(4px) translateX(4px)' : 'none',
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300, 
        damping: 20,
        delay: index * 0.1 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCardPosition();
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background gradient and effects */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-500"
        style={{ 
          opacity: isHovered ? 0.3 : 0.1,
          background: `radial-gradient(circle at center, ${color}99, transparent 70%)`,
        }}
      />
      
      {/* Digital noise overlay */}
      <div className="absolute inset-0 opacity-5 bg-noise mix-blend-overlay pointer-events-none"></div>
      
      {/* Glow effect border */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ 
          opacity: isHovered ? 0.6 : 0,
          boxShadow: `inset 0 0 30px ${color}`,
        }}
      />
      
      {/* Card content */}
      <div className="p-6 h-full flex flex-col relative z-10">
        {/* Card icon */}
        <motion.div 
          className="flex items-center justify-center w-16 h-16 mb-6 rounded"
          style={{ 
            background: isHovered ? color : `${color}22`,
          }}
          animate={{ 
            rotate: isHovered ? [0, -5, 5, -3, 3, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            rotate: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.2 }
          }}
        >
          {icon}
        </motion.div>
        
        {/* Card content */}
        <motion.div animate={{ y: isHovered ? -8 : 0 }} transition={{ duration: 0.2 }}>
          <h3 
            className="text-xl font-bold mb-2 transition-all duration-300"
            style={{ color: isHovered ? color : 'white' }}
          >
            {title}
          </h3>
          
          <p className="text-sm text-white/70 mb-5">{description}</p>
        </motion.div>
        
        {/* Pattern stats - only visible on hover */}
        <motion.div 
          className="mt-auto grid grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {count > 0 && (
            <div className="rounded bg-black/20 p-2 backdrop-blur-sm">
              <div className="text-xs text-white/50">Pattern Count</div>
              <div className="font-mono text-lg font-bold" style={{ color: color }}>
                {count}
              </div>
            </div>
          )}
          
          {effectivity > 0 && (
            <div className="rounded bg-black/20 p-2 backdrop-blur-sm">
              <div className="text-xs text-white/50">Effectiveness</div>
              <div className="font-mono text-lg font-bold flex items-center" style={{ color: color }}>
                {effectivity}%
                <Zap className="h-3 w-3 ml-1" />
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Circuit board lines */}
        <div className="absolute bottom-0 right-0 w-3/4 h-1/2 opacity-20 pointer-events-none">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: color }}
          >
            {circuitPaths.map((path, i) => (
              <motion.path 
                key={i}
                d={path} 
                strokeWidth="1"
                strokeDasharray="3 2" 
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ 
                  pathLength: isHovered ? 1 : 0.4, 
                  opacity: isHovered ? 0.8 : 0.3 
                }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            ))}
            <motion.circle cx="30" cy="50" r="2" fill={color} animate={{ r: isHovered ? 3 : 2, opacity: isHovered ? 0.8 : 0.5 }} />
            <motion.circle cx="60" cy="20" r="2" fill={color} animate={{ r: isHovered ? 3 : 2, opacity: isHovered ? 0.8 : 0.5 }} />
            <motion.circle cx="40" cy="70" r="2" fill={color} animate={{ r: isHovered ? 3 : 2, opacity: isHovered ? 0.8 : 0.5 }} />
            <motion.circle cx="70" cy="50" r="2" fill={color} animate={{ r: isHovered ? 3 : 2, opacity: isHovered ? 0.8 : 0.5 }} />
          </svg>
        </div>
        
        {/* Scan line effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[80%] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 50%, ${color}22 51%, transparent 52%)`,
            backgroundSize: '100% 8px',
          }}
          animate={{ 
            y: [0, -100], 
            opacity: isHovered ? [0.1, 0.2, 0.1] : 0 
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 3, ease: "linear" },
            opacity: { duration: 0.3 } 
          }}
        />
        
        {/* Digital pulse at the bottom */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
          animate={{ 
            scaleX: isHovered ? [0, 1, 0] : 0,
            x: isHovered ? ["-100%", "100%"] : "-100%",
            opacity: isHovered ? 0.8 : 0
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

export default PatternCard;
