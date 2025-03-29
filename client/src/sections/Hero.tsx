import { FaChevronDown } from "react-icons/fa";
import StatCard from "@/components/ui/stat-card";

const Hero = () => {
  const scrollToProjects = () => {
    const projects = document.getElementById("projects");
    if (projects) {
      window.scrollTo({
        top: projects.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      window.scrollTo({
        top: contact.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Static background with gradients instead of 3D scene */}
      
      {/* Background blurs - reduced animation */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/30 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/30 rounded-full filter blur-3xl opacity-20"></div>

      {/* Content - removed motion animations for performance */}
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl">
          <h1 className="font-['Space_Grotesk'] font-bold text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="block">Securing the</span>
            <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
              Digital Frontier
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Security researcher and graphic designer crafting beautiful, 
            secure digital experiences that push the boundaries of what's possible.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToProjects}
              className="hover-trigger px-8 py-3 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-lg shadow-secondary/30"
            >
              View Projects
            </button>
            <button 
              onClick={scrollToContact}
              className="hover-trigger px-8 py-3 rounded-lg border-2 border-accent hover:bg-accent/10 text-white font-semibold transition-all"
            >
              Get in Touch
            </button>
          </div>
          
          {/* Stats showcasing work */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="56+" label="Security Audits" accentColor="accent" animationDelay={0} />
            <StatCard value="92%" label="Client Satisfaction" accentColor="highlight" animationDelay={0.2} />
            <StatCard value="104" label="Design Projects" accentColor="secondary" animationDelay={0.4} />
            <StatCard value="12" label="Industry Awards" accentColor="accent" animationDelay={0.6} />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - static to improve performance */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <FaChevronDown className="text-accent" />
      </div>
    </section>
  );
};

export default Hero;
