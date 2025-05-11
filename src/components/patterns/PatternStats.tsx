
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sparkles, Network, Zap, Bar } from "lucide-react";

// Sample data for the charts
const patternData = [
  { name: 'Week 1', offensive: 84, defensive: 68, possession: 76 },
  { name: 'Week 2', offensive: 72, defensive: 74, possession: 82 },
  { name: 'Week 3', offensive: 87, defensive: 59, possession: 72 },
  { name: 'Week 4', offensive: 92, defensive: 65, possession: 78 },
  { name: 'Week 5', offensive: 78, defensive: 70, possession: 85 },
  { name: 'Week 6', offensive: 85, defensive: 73, possession: 80 },
  { name: 'Week 7', offensive: 91, defensive: 78, possession: 74 },
];

// Component for the animated stats counter
const AnimatedCounter = ({ value, duration = 1, color = "#ffffff" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      countRef.current = Math.floor(easedProgress * value);
      setCount(countRef.current);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return (
    <span className="font-mono" style={{ color }}>
      {count}
    </span>
  );
};

// Component for stats boxes with animated values
const StatsBox = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <div className="bg-[#0F1122]/80 border border-white/5 rounded p-4 h-full backdrop-blur-sm hover:border-[color]/30 hover:shadow-glow transition-all duration-300"
        style={{ 
          "--color": color,
          boxShadow: `0 0 20px ${color}22`
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm text-white/50">{title}</div>
          {Icon && <Icon className="h-4 w-4" style={{ color }} />}
        </div>
        <div className="text-3xl md:text-4xl font-bold" style={{ color }}>
          <AnimatedCounter value={value} color={color} />
          {title.includes("rate") && <span className="text-lg">%</span>}
        </div>
        
        {/* Circuit board pattern in the background */}
        <div className="absolute bottom-0 right-0 w-full h-full -z-10 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <path d="M10,50 L30,50 L30,20 L60,20 L60,40 L90,40" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M20,90 L20,70 L40,70 L40,50 L70,50 L70,80 L90,80" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="30" cy="50" r="1" fill={color} />
            <circle cx="60" cy="20" r="1" fill={color} />
            <circle cx="40" cy="70" r="1" fill={color} />
            <circle cx="70" cy="50" r="1" fill={color} />
          </svg>
        </div>
        
        {/* Scan line effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            height: '200%',
          }}
          animate={{ 
            y: ["-100%", "100%"],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

// Component for chart sections
const ChartSection = ({ title, children, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div 
        className="bg-[#0F1122]/80 border border-white/5 rounded-lg p-4 backdrop-blur-sm"
        style={{ boxShadow: `0 0 20px ${color}22` }}
      >
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span style={{ color }}>{title}</span>
        </h3>
        
        <div className="h-56">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const PatternStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  const springConfig = { stiffness: 100, damping: 20 };
  const springY = useSpring(y, springConfig);
  const springOpacity = useSpring(opacity, springConfig);

  return (
    <motion.div
      ref={containerRef}
      className="mt-16 mb-24"
      style={{
        opacity: springOpacity,
        y: springY
      }}
    >
      <div className="bg-[#0F1122]/60 backdrop-blur-lg border border-[#B026FF]/20 rounded-lg p-6 shadow-glow-purple-sm">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <motion.h2 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B026FF] to-[#00F5FF]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Advanced Pattern Analysis
          </motion.h2>
          
          <motion.div
            className="flex items-center gap-2 text-[#00F5FF] bg-[#00F5FF]/10 px-3 py-1 rounded-full text-sm border border-[#00F5FF]/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={14} />
            <span>AI Powered</span>
          </motion.div>
        </div>
        
        {/* Description text */}
        <motion.p 
          className="text-white/70 mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our AI-powered pattern recognition helps you identify tactical trends across multiple matches.
          Discover recurring patterns that lead to scoring opportunities or defensive vulnerabilities.
        </motion.p>
        
        {/* Stats boxes - first row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsBox 
            title="Success rate" 
            value={87} 
            icon={Zap} 
            color="#00F5FF" 
          />
          
          <StatsBox 
            title="Unique patterns" 
            value={24} 
            icon={Network} 
            color="#B026FF" 
          />
          
          <StatsBox 
            title="Average duration" 
            value={12} 
            icon={Bar} 
            color="#FAFF00" 
          />
        </div>
        
        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          {/* Effectiveness trend chart */}
          <ChartSection title="Pattern Effectiveness Trend" color="#00F5FF">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patternData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
                <XAxis dataKey="name" stroke="#FFFFFF40" fontSize={10} />
                <YAxis stroke="#FFFFFF40" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F1122', 
                    borderColor: '#FFFFFF20',
                    boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="offensive" 
                  stroke="#00F5FF" 
                  strokeWidth={2}
                  dot={{ fill: '#00F5FF', strokeWidth: 0, r: 4 }}
                  activeDot={{ fill: '#00F5FF', r: 6, strokeWidth: 2, stroke: '#00F5FF30' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="defensive" 
                  stroke="#B026FF" 
                  strokeWidth={2}
                  dot={{ fill: '#B026FF', strokeWidth: 0, r: 4 }}
                  activeDot={{ fill: '#B026FF', r: 6, strokeWidth: 2, stroke: '#B026FF30' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="possession" 
                  stroke="#FAFF00" 
                  strokeWidth={2}
                  dot={{ fill: '#FAFF00', strokeWidth: 0, r: 4 }}
                  activeDot={{ fill: '#FAFF00', r: 6, strokeWidth: 2, stroke: '#FAFF00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartSection>
          
          {/* Pattern distribution chart */}
          <ChartSection title="Pattern Distribution Analysis" color="#B026FF">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patternData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
                <XAxis dataKey="name" stroke="#FFFFFF40" fontSize={10} />
                <YAxis stroke="#FFFFFF40" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F1122', 
                    borderColor: '#FFFFFF20',
                    boxShadow: '0 0 10px rgba(176, 38, 255, 0.2)',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="offensive" 
                  stackId="1"
                  stroke="#00F5FF" 
                  fill="#00F5FF30" 
                />
                <Area 
                  type="monotone" 
                  dataKey="defensive" 
                  stackId="1"
                  stroke="#B026FF" 
                  fill="#B026FF30" 
                />
                <Area 
                  type="monotone" 
                  dataKey="possession" 
                  stackId="1"
                  stroke="#FAFF00" 
                  fill="#FAFF0030" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartSection>
        </div>
        
        {/* Footer with AI info */}
        <motion.div 
          className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#00F5FF] rounded-full animate-pulse"></div>
            <span>Pattern analysis auto-updated: Today, 08:45 AM</span>
          </div>
          
          <div className="mt-2 md:mt-0">
            <span className="text-[#B026FF]">AI Confidence Rate: 97.2%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatternStats;
