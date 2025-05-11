
import React from "react";

interface BackgroundEffectsProps {
  variant?: 'default' | 'subtle';
}

const BackgroundEffects = ({ variant = 'default' }: BackgroundEffectsProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      {variant === 'subtle' && (
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
      )}
    </div>
  );
};

export default BackgroundEffects;
