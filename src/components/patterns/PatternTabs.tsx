
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import PatternCategoryGrid from "./PatternCategoryGrid";
import { PatternCategory } from "./patternCategories";
import { Sparkles, Zap, Shield, BrainCircuit } from "lucide-react";

interface PatternTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  patternCategories: PatternCategory[];
}

const PatternTabs = ({ activeTab, setActiveTab, patternCategories }: PatternTabsProps) => {
  // Track if this is the initial render to prevent animation on load
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  useEffect(() => {
    // After component mounts, set isInitialRender to false
    const timer = setTimeout(() => setIsInitialRender(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get active color based on selected tab
  const getActiveColor = () => {
    switch (activeTab) {
      case "offensive": return "#00F5FF";
      case "defensive": return "#B026FF";
      case "possession": return "#FAFF00";
      default: return "#00F5FF";
    }
  };
  
  const activeColor = getActiveColor();
  
  // Custom tab indicator animations
  const tabIndicatorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    exit: { 
      scaleX: 0, 
      opacity: 0, 
      transition: { 
        duration: 0.2, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative">
          {/* Glass panel behind tabs */}
          <motion.div 
            className="absolute inset-0 rounded-xl -z-10"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            style={{ 
              background: 'rgba(15, 17, 34, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          />
          
          <TabsList className="bg-transparent w-full flex justify-center p-1 h-auto">
            <TabTrigger 
              value="all"
              isActive={activeTab === "all"}
              label="All Patterns"
              icon={<Sparkles size={16} />}
              color={activeColor}
            />
            <TabTrigger 
              value="offensive"
              isActive={activeTab === "offensive"}
              label="Offensive"
              icon={<Zap size={16} />}
              color="#00F5FF"
            />
            <TabTrigger 
              value="defensive"
              isActive={activeTab === "defensive"}
              label="Defensive"
              icon={<Shield size={16} />}
              color="#B026FF"
            />
            <TabTrigger 
              value="possession"
              isActive={activeTab === "possession"}
              label="Possession"
              icon={<BrainCircuit size={16} />}
              color="#FAFF00"
            />
          </TabsList>
          
          {/* Animated background indicator for active tab */}
          {!isInitialRender && (
            <AnimatePresence>
              <motion.div
                key={activeTab}
                className="absolute h-[calc(100%-8px)] rounded-lg top-[4px]"
                style={{
                  backgroundColor: `${activeColor}22`,
                  boxShadow: `0 0 15px ${activeColor}66`,
                  left: `${(["all", "offensive", "defensive", "possession"].indexOf(activeTab) * 25) + 2}%`,
                  width: "calc(25% - 4px)",
                  zIndex: -1
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabIndicatorVariants}
              />
            </AnimatePresence>
          )}
        </div>
        
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "all" && <PatternCategoryGrid categories={patternCategories} filter="all" />}
              {activeTab === "offensive" && <PatternCategoryGrid categories={patternCategories} filter="offensive" />}
              {activeTab === "defensive" && <PatternCategoryGrid categories={patternCategories} filter="defensive" />}
              {activeTab === "possession" && <PatternCategoryGrid categories={patternCategories} filter="possession" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </motion.div>
  );
};

// Custom tab trigger component with icon and animated effects
const TabTrigger = ({ value, isActive, label, icon, color }) => {
  return (
    <TabsTrigger 
      value={value}
      className={`
        flex items-center gap-2 px-4 py-3 bg-transparent border-none relative
        data-[state=active]:bg-transparent data-[state=active]:shadow-none
        group transition-all duration-300
      `}
    >
      {/* Tab content with icon and label */}
      <span className="flex items-center gap-2 z-10 relative">
        <span 
          className={`text-white/50 group-data-[state=active]:text-current transition-colors duration-300`}
          style={{ color: isActive ? color : undefined }}
        >
          {icon}
        </span>
        <span 
          className="text-white/70 group-data-[state=active]:text-white transition-colors duration-300"
        >
          {label}
        </span>
      </span>
      
      {/* Active dot indicator */}
      <motion.span
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          scale: isActive ? 1 : 0,
          backgroundColor: color
        }}
        transition={{ duration: 0.3 }}
      />
    </TabsTrigger>
  );
};

export default PatternTabs;
