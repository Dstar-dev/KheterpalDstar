import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  connected: boolean;
}

const InteractiveIllustration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Adjust colors based on theme
  const getColors = () => {
    if (theme === 'dark') {
      return {
        primary: '#00ffff', // Cyan
        secondary: '#ff00ff', // Magenta
        tertiary: '#3a86ff', // Blue
        background: '#121212'
      };
    } else {
      return {
        primary: '#ff9900', // Orange
        secondary: '#ff3366', // Pink
        tertiary: '#3a86ff', // Blue
        background: '#ffffff'
      };
    }
  };

  // Initialize particles
  useEffect(() => {
    const colors = getColors();
    const initParticles = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const particles: Particle[] = [];
      const particleCount = Math.floor(rect.width * rect.height / 8000); // Adjust density
      
      for (let i = 0; i < particleCount; i++) {
        const colorRand = Math.random();
        let color;
        
        if (colorRand < 0.4) {
          color = colors.primary;
        } else if (colorRand < 0.7) {
          color = colors.secondary;
        } else {
          color = colors.tertiary;
        }
        
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          color: color,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connected: false
        });
      }
      
      particlesRef.current = particles;
    };

    initParticles();
    
    const handleResize = () => {
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const colors = getColors();
      ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }
        
        // Reset connection status
        particle.connected = false;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw connections
      ctx.lineWidth = 0.5;
      
      // Connect particles that are close to each other
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Connect particles
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${theme === 'dark' ? '0, 255, 255' : '255, 153, 0'}, ${1 - distance / 100})`;
            ctx.stroke();
            
            p1.connected = true;
            p2.connected = true;
          }
        }
      }
      
      // Interact with mouse
      if (isMouseInCanvas) {
        particlesRef.current.forEach(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Draw connection to mouse
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.strokeStyle = `rgba(${theme === 'dark' ? '255, 0, 255' : '255, 51, 102'}, ${1 - distance / 150})`;
            ctx.stroke();
            
            // Add slight attraction to mouse
            particle.vx = particle.vx * 0.9 + dx * 0.0003;
            particle.vy = particle.vy * 0.9 + dy * 0.0003;
          }
        });
      }
      
      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMouseInCanvas, mousePosition, theme]);

  // Mouse event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setIsMouseInCanvas(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInCanvas(false);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  );
};

export default InteractiveIllustration;