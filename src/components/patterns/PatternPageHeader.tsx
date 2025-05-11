
import React, { useState } from "react";
import { Grid, Diamond, Network, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PatternPageHeader = () => {
  // Track mouse for interactive hero glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Spring physics for smoother movement
  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform mouse position to light position
  const lightX = useTransform(x, (val) => val - 250);
  const lightY = useTransform(y, (val) => val - 250);
  
  // Handle mouse move events for the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Animation variants for staggered text and content appearance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mb-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive glow effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[80px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.8), rgba(176, 38, 255, 0.5) 50%, transparent 80%)',
            left: lightX,
            top: lightY,
            opacity: isHovering ? 0.5 : 0.2,
          }}
        />
      </div>
      
      <div className="relative">
        {/* Cyber pattern lines - top */}
        <motion.div 
          className="absolute -top-2 left-0 w-full h-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)'
          }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Main content */}
        <motion.div 
          variants={item}
          className="flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between bg-[#0F1122]/40 backdrop-blur-lg rounded-xl p-8 border border-white/5"
        >
          <div className="flex items-start gap-6">
            {/* Animated icon */}
            <motion.div 
              variants={item}
              className="p-4 rounded-lg bg-gradient-to-br from-[#00F5FF]/30 to-[#0F1122]/80 
                text-[#00F5FF] shadow-glow-blue-sm border border-[#00F5FF]/20
                hover:shadow-glow-blue-md transition-all duration-500"
              whileHover={{ 
                rotate: [0, -5, 5, -3, 3, 0],
                scale: 1.05,
                transition: { duration: 0.5 }
              }}
            >
              <Network className="h-8 w-8" />
            </motion.div>
            
            <div>
              <motion.div
                variants={item}
                className="relative"
              >
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#B026FF]">
                  Play Patterns
                </h1>
                
                {/* Glitch effect on hover */}
                <div className="group relative">
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#00F5FF]"
                    animate={{ width: "70%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
              </motion.div>
              
              <motion.p 
                variants={item}
                className="text-white/70 mt-2 max-w-2xl"
              >
                Discover and analyze tactical patterns that give your team the competitive edge.
                Our AI-powered system identifies recurring strategies and movement patterns.
              </motion.p>
            </div>
          </div>
          
          {/* Action buttons */}
          <motion.div 
            variants={item}
            className="flex items-center gap-4"
          >
            <Button 
              variant="outline" 
              className="gap-2 text-[#B026FF] border-[#B026FF]/30 hover:bg-[#B026FF]/10 hover:text-[#B026FF] hover:shadow-glow-purple-sm transition-all duration-300"
            >
              <Network className="h-4 w-4" />
              Share
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-[#00F5FF] to-[#00F5FF]/80 text-[#0F1122] gap-2 
                shadow-glow-blue-sm hover:shadow-glow-blue-md transition-all font-medium
                hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Create Pattern
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Cyber pattern lines - bottom */}
        <motion.div 
          className="absolute -bottom-2 left-0 w-full h-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #B026FF, transparent)'
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Stats preview cards */}
        <motion.div 
          variants={item}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          <StatPreview 
            label="Active Patterns"
            value="24"
            icon={<Diamond className="h-4 w-4" />}
            color="#00F5FF"
            delay={0.6}
          />
          
          <StatPreview 
            label="Detection Rate"
            value="98.5%"
            icon={<Grid className="h-4 w-4" />}
            color="#B026FF"
            delay={0.7}
          />
          
          <StatPreview 
            label="Analysis Accuracy"
            value="High"
            icon={<Sparkles className="h-4 w-4" />}
            color="#FAFF00"
            delay={0.8}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Stat preview card component
const StatPreview = ({ label, value, icon, color, delay = 0 }) => {
  return (
    <motion.div
      className="bg-[#0F1122]/60 backdrop-blur-sm border border-white/5 rounded-lg p-3 flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -4,
        boxShadow: `0 0 20px ${color}33`,
        borderColor: `${color}33`,
      }}
    >
      <div 
        className="p-2 rounded-md"
        style={{ backgroundColor: `${color}22`, color }}
      >
        {icon}
      </div>
      
      <div>
        <div className="text-xs text-white/50">{label}</div>
        <div className="font-mono font-bold" style={{ color }}>{value}</div>
      </div>
    </motion.div>
  );
};

export default PatternPageHeader;
