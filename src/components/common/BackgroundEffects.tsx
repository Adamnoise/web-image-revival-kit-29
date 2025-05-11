
import React, { useEffect, useRef } from "react";

interface BackgroundEffectsProps {
  variant?: 'default' | 'vibrant' | 'subtle';
  animated?: boolean;
}

const BackgroundEffects = ({ variant = 'default', animated = true }: BackgroundEffectsProps) => {
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

    // Skip animation if animated is false
    if (!animated) {
      // Just draw a static version
      drawStaticBackground(ctx, canvas, variant);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    // Particle configuration
    const particleCount = variant === 'vibrant' ? 50 : variant === 'subtle' ? 25 : 35;
    const particleSize = variant === 'vibrant' ? 2 : 1.5;
    const particleColor = variant === 'vibrant' 
      ? ['rgba(155, 135, 245, 0.4)', 'rgba(58, 54, 224, 0.3)', 'rgba(110, 89, 165, 0.35)']
      : ['rgba(155, 135, 245, 0.25)', 'rgba(58, 54, 224, 0.2)', 'rgba(110, 89, 165, 0.2)'];
    
    const connectionDistance = 150;
    const connectionOpacity = 0.1;
    
    interface Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      color: string;
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * particleSize + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        size,
        color: particleColor[Math.floor(Math.random() * particleColor.length)]
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.dx;
        p.y += p.dy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${connectionOpacity * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant, animated]);

  // Function to draw a static background when animation is disabled
  const drawStaticBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, variant: string) => {
    const particleCount = variant === 'vibrant' ? 30 : variant === 'subtle' ? 15 : 20;
    const particleSize = variant === 'vibrant' ? 1.5 : 1;
    const particleColor = variant === 'vibrant' 
      ? ['rgba(155, 135, 245, 0.4)', 'rgba(58, 54, 224, 0.3)', 'rgba(110, 89, 165, 0.35)']
      : ['rgba(155, 135, 245, 0.25)', 'rgba(58, 54, 224, 0.2)', 'rgba(110, 89, 165, 0.2)'];

    // Draw some static particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * particleSize + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor[Math.floor(Math.random() * particleColor.length)];
      ctx.fill();
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
