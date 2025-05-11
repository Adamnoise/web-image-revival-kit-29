
import React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  valueClassName?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  label?: string;
  color?: string;
}

const CircularProgress = ({
  value,
  maxValue = 100,
  size = 64,
  strokeWidth = 8,
  className,
  valueClassName,
  showValue = true,
  valueFormatter = (v) => `${Math.round(v)}%`,
  label,
  color = "#00F5FF",
}: CircularProgressProps) => {
  // Calculate the progress percentage
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn("circular-progress", className)} 
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="circular-progress-circle">
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            className="circular-progress-bg"
          />
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="circular-progress-value"
            style={{ stroke: color }}
          />
        </svg>
        
        {showValue && (
          <div className={cn("circular-progress-text", valueClassName)}>
            {valueFormatter(percentage)}
          </div>
        )}
      </div>
      
      {label && (
        <div className="mt-2 text-xs text-white/70">{label}</div>
      )}
    </div>
  );
};

export { CircularProgress };
