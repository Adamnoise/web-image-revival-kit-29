
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";
import { CircularProgress } from "../ui/circular-progress";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: LucideIcon;
  variant?: "default" | "cyber" | "neon" | "iqon";
  className?: string;
  iconClassName?: string;
  color?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  delay?: number;
  showGauge?: boolean;
  gaugeValue?: number;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  className,
  iconClassName,
  color,
  trend,
  delay = 0,
  showGauge = false,
  gaugeValue = 0
}: StatsCardProps) => {
  const variantStyles = {
    default: {
      card: "border-muted",
      icon: "bg-muted text-muted-foreground",
      value: "text-foreground",
      change: {
        positive: "text-green-500",
        negative: "text-red-500"
      }
    },
    cyber: {
      card: "border-[#00F5FF]/30 bg-[#070A14]/80 backdrop-blur-md",
      icon: "bg-[#00F5FF]/10 text-[#00F5FF]",
      value: "text-[#00F5FF] font-mono",
      change: {
        positive: "text-[#00F5FF]",
        negative: "text-[#FF00A0]" // Neon pink for negative
      }
    },
    neon: {
      card: "border-[#B026FF]/30 bg-[#070A14]/80 backdrop-blur-md",
      icon: "bg-[#B026FF]/10 text-[#B026FF]",
      value: "text-[#B026FF] font-mono",
      change: {
        positive: "text-[#FAFF00]",
        negative: "text-[#FF00A0]"
      }
    },
    // New IQON-inspired style
    iqon: {
      card: "border-[#00F5FF]/20 bg-[#070A14]/90 backdrop-blur-md rounded-xl",
      icon: "bg-[#070A14] border border-[#00F5FF]/30 text-[#00F5FF]",
      value: "text-white font-medium",
      change: {
        positive: "text-[#00F5FF]",
        negative: "text-[#FF3A5E]"
      }
    }
  };
  
  const style = variantStyles[variant];
  
  // Use either change or trend object depending on what's provided
  const trendData = trend || change;
  const isPositive = trend ? trend.isPositive : change?.positive;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={className}
    >
      <Card className={cn("overflow-hidden shadow-md hover:shadow-lg transition-all duration-300", style.card)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
              <div className="flex items-end gap-2">
                <h3 className={cn("text-2xl font-bold", style.value)}>{value}</h3>
                
                {trendData && (
                  <div className={cn(
                    "text-xs font-medium flex items-center gap-0.5",
                    isPositive ? style.change.positive : style.change.negative
                  )}>
                    {isPositive ? '↑' : '↓'} {trendData.value}
                  </div>
                )}
              </div>
            </div>
            
            {showGauge ? (
              <div className="h-14 w-14">
                <CircularProgress 
                  value={gaugeValue} 
                  size={56} 
                  strokeWidth={6} 
                  color={variant === 'neon' ? '#B026FF' : '#00F5FF'} 
                />
              </div>
            ) : Icon && (
              <div className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center",
                style.icon,
                iconClassName
              )}>
                <Icon size={20} />
              </div>
            )}
          </div>
          
          {variant === "cyber" || variant === "iqon" ? (
            <div className="h-1 w-full bg-[#00F5FF]/10 mt-4 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#00F5FF]/80 to-[#00F5FF]/20"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              ></motion.div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
