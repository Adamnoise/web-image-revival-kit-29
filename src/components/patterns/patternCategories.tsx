
import { BarChart2, Layers, Diamond, Grid, PieChart, Zap, Network, Flashlight, Compass } from "lucide-react";
import { LucideIcon } from "lucide-react";
import React from "react";

export interface PatternCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  secondaryColor: string;
  complexity: number; // 1-10 scale for visualization
  icon: LucideIcon;
  count: number;
  effectivity?: number; // 0-100%
}

export const getPatternCategories = (): PatternCategory[] => [
  { 
    id: "offensive", 
    title: "Offensive Patterns", 
    description: "Analyze attacking strategies and movement patterns",
    color: "#00F5FF",
    secondaryColor: "#0099FF",
    complexity: 8,
    count: 14,
    effectivity: 87,
    icon: Zap
  },
  { 
    id: "defensive", 
    title: "Defensive Patterns", 
    description: "Discover defensive positioning and pressure tactics",
    color: "#B026FF", 
    secondaryColor: "#8A2BE2",
    complexity: 7,
    count: 12,
    effectivity: 74,
    icon: Layers
  },
  { 
    id: "possession", 
    title: "Possession Patterns", 
    description: "Review ball control and passing sequences",
    color: "#FAFF00", 
    secondaryColor: "#FFD700",
    complexity: 6,
    count: 9,
    effectivity: 82,
    icon: Network
  },
  { 
    id: "transition", 
    title: "Transition Patterns", 
    description: "Examine quick counter-attacks and defensive recovery",
    color: "#00F5FF",
    secondaryColor: "#4ECDC4",
    complexity: 9,
    count: 8,
    effectivity: 68,
    icon: Compass
  },
  { 
    id: "setpiece", 
    title: "Set Piece Patterns", 
    description: "Analyze corner kicks, free kicks and penalties",
    color: "#B026FF", 
    secondaryColor: "#8A2BE2",
    complexity: 5,
    count: 7,
    effectivity: 90,
    icon: Flashlight
  }
];
