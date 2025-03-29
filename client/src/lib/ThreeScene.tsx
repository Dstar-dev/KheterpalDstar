import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    secondaryParticles: THREE.Points;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    animationFrameId: number | null;
    clock: THREE.Clock;
  }>({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(),
    renderer: new THREE.WebGLRenderer(),
    particles: new THREE.Points(),
    secondaryParticles: new THREE.Points(),
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    animationFrameId: null,
    clock: new THREE.Clock(),
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const clock = new THREE.Clock();
    
    // Create primary particles (smaller, more numerous)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color1 = new THREE.Color("#22D3EE"); // Cyan
    const color2 = new THREE.Color("#EC4899"); // Pink
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
      
      // Random color between cyan and pink
      const mixRatio = Math.random();
      const particleColor = new THREE.Color().lerpColors(color1, color2, mixRatio);
      
      colors[i] = particleColor.r;
      colors[i + 1] = particleColor.g;
      colors[i + 2] = particleColor.b;
      
      sizes[i / 3] = Math.random() * 0.05 + 0.01;
    }
    
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );
    
    // Create custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceFromCenter > 0.5) discard;
          gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, distanceFromCenter));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    
    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create secondary particles (larger, animated differently)
    const secondaryGeometry = new THREE.BufferGeometry();
    const secondaryCount = 200;
    
    const secondaryPositions = new Float32Array(secondaryCount * 3);
    const secondarySizes = new Float32Array(secondaryCount);
    
    for (let i = 0; i < secondaryCount * 3; i += 3) {
      secondaryPositions[i] = (Math.random() - 0.5) * 20;
      secondaryPositions[i + 1] = (Math.random() - 0.5) * 20;
      secondaryPositions[i + 2] = (Math.random() - 0.5) * 20;
      
      secondarySizes[i / 3] = Math.random() * 0.15 + 0.05;
    }
    
    secondaryGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(secondaryPositions, 3)
    );
    
    secondaryGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(secondarySizes, 1)
    );
    
    const secondaryMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: new THREE.Color("#6366F1"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.7,
    });
    
    const secondaryParticles = new THREE.Points(secondaryGeometry, secondaryMaterial);
    scene.add(secondaryParticles);
    
    // Save references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      secondaryParticles,
      raycaster,
      mouse,
      animationFrameId: null,
      clock,
    };
    
    // Animation function
    const animate = () => {
      const { 
        particles, 
        secondaryParticles, 
        raycaster, 
        mouse, 
        scene, 
        camera, 
        renderer,
        clock,
      } = sceneRef.current;
      
      const time = clock.getElapsedTime();
      
      // Slowly rotate particles
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      // Move particles based on mouse position
      const targetX = mousePosition.x * 0.001;
      const targetY = -mousePosition.y * 0.001;
      
      particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetX - particles.rotation.y) * 0.05;
      
      // Animate secondary particles differently
      secondaryParticles.rotation.x = Math.sin(time * 0.2) * 0.1;
      secondaryParticles.rotation.y = Math.cos(time * 0.1) * 0.1;
      secondaryParticles.position.z = Math.sin(time * 0.3) * 0.5;
      
      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      
      renderer.render(scene, camera);
      sceneRef.current.animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Update mouse position for parallax effect
      setMousePosition({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - window.innerHeight / 2,
      });
      
      // Update normalized mouse coordinates for raycaster
      sceneRef.current.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      sceneRef.current.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (sceneRef.current.animationFrameId !== null) {
        cancelAnimationFrame(sceneRef.current.animationFrameId);
      }
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      secondaryGeometry.dispose();
      secondaryMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePosition]);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 -z-10" />;
};

export default ThreeScene;
