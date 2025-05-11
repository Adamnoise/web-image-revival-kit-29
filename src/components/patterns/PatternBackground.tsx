
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  MeshDistortMaterial, 
  Sphere, 
  GradientTexture, 
  Stars,
  Sparkles,
  Float
} from "@react-three/drei";
import { Vector3, Color } from "three";
import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { motion } from "framer-motion-3d";

// Animated sphere component with distortion and color effects
const AnimatedSphere = ({ position, size, speed, distort, color1, color2, mouseX, mouseY }) => {
  const sphereRef = useRef(null);
  
  // Transform mouse position values to rotation speeds
  const rotationX = useTransform(mouseY, [0, 1], [0.01, -0.01]);
  const rotationY = useTransform(mouseX, [0, 1], [-0.01, 0.01]);
  
  // Apply spring physics for smoother movement
  const smoothRotationX = useSpring(rotationX, { damping: 50, stiffness: 200 });
  const smoothRotationY = useSpring(rotationY, { damping: 50, stiffness: 200 });
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    
    // Base animation
    sphereRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    
    // Add the mouse-influenced rotation
    sphereRef.current.rotation.x += smoothRotationX.get();
    sphereRef.current.rotation.y += smoothRotationY.get();
  });
  
  return (
    <mesh ref={sphereRef} position={[position.x, position.y, position.z]}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial 
        distort={distort} 
        speed={0.4} 
        roughness={0.2}
        metalness={0.8}
        wireframe={Math.random() > 0.7}
      >
        <GradientTexture 
          stops={[0, 0.5, 1]} 
          colors={[color1, color2, color1]} 
          size={1024} 
        />
      </MeshDistortMaterial>
    </mesh>
  );
};

// Enhanced grid with animation and interactivity
const PatternGrid = ({ mouseX, mouseY }) => {
  const gridRef = useRef(null);
  
  // Transform mouse movement to grid rotation
  const rotationZ = useTransform(mouseX, [0, 1], [0.01, -0.01]);
  const rotationX = useTransform(mouseY, [0, 1], [-0.01, 0.01]);
  
  // Apply spring physics for smoother movement
  const smoothRotationZ = useSpring(rotationZ, { damping: 40, stiffness: 100 });
  const smoothRotationX = useSpring(rotationX, { damping: 40, stiffness: 100 });
  
  useFrame((state) => {
    if (!gridRef.current) return;
    
    // Base animation
    gridRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    
    // Add mouse influence
    gridRef.current.rotation.z += smoothRotationZ.get();
    gridRef.current.rotation.x += smoothRotationX.get();
  });

  return (
    <mesh ref={gridRef} rotation={[Math.PI / 4, 0, 0]} position={[0, 0, -5]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial 
        color="#00F5FF" 
        wireframe={true} 
        opacity={0.1} 
        transparent={true} 
      />
    </mesh>
  );
};

// Main scene component
const Scene = ({ mouseX, mouseY }) => {
  return (
    <>
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#B026FF" />
      
      {/* Animated grid */}
      <PatternGrid mouseX={mouseX} mouseY={mouseY} />
      
      {/* Background stars */}
      <Stars 
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Sparkles for added visual interest */}
      <Sparkles 
        count={100}
        scale={10}
        size={1}
        speed={0.3}
        color="#00F5FF"
      />
      
      {/* Animated spheres */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <AnimatedSphere 
          position={new Vector3(-3, 0, -2)} 
          size={1.5} 
          speed={0.5} 
          distort={0.4}
          color1="#00F5FF" 
          color2="#0F1122" 
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Float>
      
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
        <AnimatedSphere 
          position={new Vector3(3, 0, -4)} 
          size={2} 
          speed={0.3} 
          distort={0.6}
          color1="#B026FF" 
          color2="#0F1122"
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.2}>
        <AnimatedSphere 
          position={new Vector3(0, -2, -6)} 
          size={3} 
          speed={0.2} 
          distort={0.2}
          color1="#FAFF00" 
          color2="#0F1122"
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Float>
    </>
  );
};

// Main component that manages mouse interaction and renders the 3D scene
const PatternBackground = () => {
  // Track mouse position for interactive effects
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to 0-1
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  return (
    <div className="fixed inset-0 z-0 bg-[#070A14]">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5"></div>
      
      {/* 3D scene */}
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }} 
        dpr={[1, 2]} // Optimize for performance vs quality
        gl={{ 
          antialias: true,
          alpha: true,
          logarithmicDepthBuffer: true,
        }}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#070A14] to-transparent pointer-events-none" />
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2px,
            rgba(0, 245, 255, 0.03) 3px,
            transparent 3px,
            transparent 8px
          )`,
          backgroundSize: '100% 8px',
        }}
      />
    </div>
  );
};

export default PatternBackground;
