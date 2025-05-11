
import React from "react";
import { motion } from "framer-motion";
import PatternCard from "./PatternCard";
import { PatternCategory } from "./patternCategories";

interface PatternCategoryGridProps {
  categories: PatternCategory[];
  filter?: string;
}

const PatternCategoryGrid = ({ categories, filter = "all" }: PatternCategoryGridProps) => {
  const filteredCategories = filter === "all" 
    ? categories 
    : categories.filter(cat => {
        switch (filter) {
          case "offensive":
            return cat.id === "offensive" || cat.id === "transition";
          case "defensive":
            return cat.id === "defensive";
          case "possession":
            return cat.id === "possession" || cat.id === "setpiece";
          default:
            return true;
        }
      });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredCategories.map((category, index) => (
        <motion.div key={category.id} variants={item}>
          <PatternCard 
            title={category.title}
            description={category.description}
            color={category.color}
            secondaryColor={category.secondaryColor}
            icon={category.icon}
            index={index}
            complexity={category.complexity}
            count={category.count}
            effectivity={category.effectivity}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PatternCategoryGrid;
