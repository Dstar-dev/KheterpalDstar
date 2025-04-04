import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
  glowIntensity?: number;
  rotationFactor?: number;
}

export const InteractiveCard = ({
  children,
  className = "",
  depth = 20,
  glowColor,
  glowIntensity = 0.5,
  rotationFactor = 7
}: InteractiveCardProps) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Default glow color based on theme if not provided
  const defaultGlowColor = theme === 'dark' ? "#00ffff" : "#ff9900";
  const effectiveGlowColor = glowColor || defaultGlowColor;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    // Dividing by larger numbers makes the rotation more subtle
    const rotateY = mouseX / (rect.width / rotationFactor);
    const rotateX = -mouseY / (rect.height / rotationFactor);
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Track mouse position for glow effect
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotation smoothly when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  // Floating animation
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setPosition({
          x: Math.sin(Date.now() / 1000) * 5,
          y: Math.cos(Date.now() / 1500) * 5
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // Calculate glow effect position
  const glowX = mousePosition.x * 100;
  const glowY = mousePosition.y * 100;
  const glowSize = isHovered ? '150%' : '100%';
  const glowOpacity = isHovered ? glowIntensity : glowIntensity * 0.3;

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl perspective-1000",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={!isHovered ? {
        x: position.x,
        y: position.y,
      } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${effectiveGlowColor}, transparent ${glowSize})`,
          opacity: glowOpacity,
          zIndex: 1
        }}
      />
      
      {/* 3D card effect */}
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front face */}
        <div className="w-full h-full" style={{ transform: "translateZ(0px)" }}>
          {children}
        </div>
        
        {/* Side edges to create depth effect */}
        <div className="absolute inset-0 -z-10">
          {/* Top */}
          <div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"
            style={{ transform: `translateY(-1px) translateZ(${-depth / 2}px) rotateX(90deg)` }}
          />
          {/* Bottom */}
          <div
            className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"
            style={{ transform: `translateY(1px) translateZ(${-depth / 2}px) rotateX(90deg)` }}
          />
          {/* Left */}
          <div
            className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gray-400/20 to-transparent"
            style={{ transform: `translateX(-1px) translateZ(${-depth / 2}px) rotateY(90deg)` }}
          />
          {/* Right */}
          <div
            className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gray-400/20 to-transparent"
            style={{ transform: `translateX(1px) translateZ(${-depth / 2}px) rotateY(90deg)` }}
          />
        </div>
        
        {/* Back face */}
        <div
          className="absolute inset-0 border border-gray-400/10 rounded-xl bg-gradient-to-br from-gray-100/5 to-gray-400/10 dark:from-gray-800/5 dark:to-gray-900/20"
          style={{ transform: `translateZ(${-depth}px)`, backfaceVisibility: "hidden" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCard;