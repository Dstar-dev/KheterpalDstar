import { FaChevronDown, FaShieldAlt, FaLock, FaSearch } from "react-icons/fa";
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
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="accent-line mb-6"></div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white">
              Cybersecurity <span className="text-primary">Research</span> & Digital <span className="text-primary">Design</span>
            </h1>
            <p className="font-body text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              Advanced security solutions and beautiful, user-centered design for companies seeking to protect their digital assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToProjects}
                className="btn-primary px-8 py-3 rounded-md font-medium"
              >
                View Projects
              </button>
              <button 
                onClick={scrollToContact}
                className="btn-secondary px-8 py-3 rounded-md font-medium"
              >
                Contact Us
              </button>
            </div>
            
            {/* Stats showcasing work */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <span className="stats-value text-primary mr-2">56+</span>
                <span className="stats-label">Security Audits</span>
              </div>
              <div className="flex items-center">
                <span className="stats-value text-primary mr-2">92%</span>
                <span className="stats-label">Client Retention</span>
              </div>
              <div className="flex items-center">
                <span className="stats-value text-primary mr-2">104</span>
                <span className="stats-label">Projects Completed</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="w-full h-[500px] bg-secondary rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10"></div>
                
                {/* Hero graphics - security focused illustrations */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <FaShieldAlt className="text-primary text-2xl" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-primary rounded-xl shadow-lg flex items-center justify-center">
                  <FaLock className="text-white text-3xl" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <FaSearch className="text-primary text-xl" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full"></div>
              </div>
              
              {/* Badge elements for highlights */}
              <div className="absolute -top-4 -right-4 badge badge-primary">
                Advanced Security
              </div>
              <div className="absolute -bottom-4 -left-4 badge badge-secondary">
                Modern Design
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <FaChevronDown className="text-primary" />
      </div>
    </section>
  );
};

export default Hero;
