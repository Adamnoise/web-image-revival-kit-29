
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PatternCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  color: string;
  secondaryColor?: string;
  complexity?: number;
  count?: number;
  effectivity?: number;
  className?: string;
}

const PatternCard = ({
  title,
  description,
  icon: Icon,
  index,
  color,
  secondaryColor = "#B026FF",
  complexity = 3,
  count = 0,
  effectivity = 0,
  className
}: PatternCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={className}
    >
      <Card className="overflow-hidden cyber-card h-full flex flex-col">
        {/* Card header with neon border */}
        <div
          className="p-6 relative"
          style={{
            backgroundImage: `radial-gradient(circle at top right, ${color}20, transparent 70%)`
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
            style={{ backgroundImage: `linear-gradient(to right, ${color}, ${secondaryColor})` }}
          ></div>
          
          <div className="flex items-start justify-between">
            <div 
              className="h-12 w-12 rounded-md flex items-center justify-center mb-4"
              style={{ 
                backgroundColor: `${color}20`,
                border: `1px solid ${color}40`,
                boxShadow: `0 0 15px ${color}30` 
              }}
            >
              <Icon className="h-6 w-6" style={{ color: color }} />
            </div>
            
            {count > 0 && (
              <Badge 
                variant="outline" 
                className="bg-[#070A14]/80 border"
                style={{ borderColor: `${color}40`, color: color }}
              >
                {count} patterns
              </Badge>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        
        {/* Card metrics */}
        <CardContent className="pt-4 pb-0 flex-1">
          <div className="space-y-3">
            {/* Complexity meter */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Complexity</span>
                <span 
                  className="font-mono"
                  style={{ color }}
                >
                  {complexity}/5
                </span>
              </div>
              <div className="h-1.5 bg-[#1A1E2E] rounded-full overflow-hidden flex">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full flex-1 mx-0.5 first:ml-0 last:mr-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: i < complexity ? color : 'transparent',
                      boxShadow: i < complexity ? `0 0 8px ${color}` : 'none'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Effectivity meter */}
            {effectivity > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Effectivity</span>
                  <span 
                    className="font-mono"
                    style={{ color: secondaryColor }}
                  >
                    {effectivity}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#1A1E2E] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${effectivity}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ 
                      backgroundImage: `linear-gradient(to right, ${color}, ${secondaryColor})`,
                      boxShadow: `0 0 8px ${secondaryColor}`
                    }}
                  ></motion.div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-4">
          <div className="w-full flex justify-between items-center border-t border-dashed border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <div 
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: color }}
              ></div>
              <span>ACTIVE</span>
            </div>
            
            <div className="text-xs font-mono" style={{ color: secondaryColor }}>
              ID: {(index + 1).toString().padStart(2, '0')}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PatternCard;
