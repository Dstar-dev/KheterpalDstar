import { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    animationFrameId: number | null;
  }>({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(),
    renderer: new THREE.WebGLRenderer(),
    particles: new THREE.Points(),
    animationFrameId: null,
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
    camera.position.z = 3;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    
    // Create material with custom gradient colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color("#22D3EE"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });
    
    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Save references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      animationFrameId: null,
    };
    
    // Animation function
    const animate = () => {
      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0003;
      
      renderer.render(scene, camera);
      sceneRef.current.animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => {
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
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0" />;
};

export default ThreeScene;
