import { createRoot } from "react-dom/client";
import { StrictMode, useEffect } from "react";
import App from "./App";
import "./index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Create a wrapper component to initialize AOS and enforce dark mode
const AppWithAOS = () => {
  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true, // animations occur each time the element comes into view
      offset: 50,
    });
    
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<AppWithAOS />);
