
import React, { useEffect, useRef } from "react";

interface BackgroundEffectsProps {
  variant?: 'default' | 'vibrant' | 'subtle';
  animated?: boolean;
}

const BackgroundEffects = ({ variant = 'default', animated = false }: BackgroundEffectsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Just draw a subtle grid pattern if not animated
    if (!animated) {
      drawGrid(ctx, canvas);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    // Animation loop with minimal particles
    const particleCount = variant === 'vibrant' ? 20 : 10;
    
    // Create particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid(ctx, canvas);
      
      // Only draw moving particles if animated is true
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 240, ${p.opacity})`;
        ctx.fill();
      });
    };
    
    if (animated) {
      animate();
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant, animated]);

  // Function to draw a subtle grid
  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gridSize = 40;
    const lineOpacity = 0.03;
    
    ctx.strokeStyle = `rgba(100, 116, 240, ${lineOpacity})`;
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default BackgroundEffects;
