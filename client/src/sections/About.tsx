import { motion } from "framer-motion";
import { FaShieldAlt, FaCodeBranch, FaCheck } from "react-icons/fa";
import GlassCard from "@/components/ui/glass-card";

const About = () => {
  const securitySkills = [
    "Penetration Testing",
    "Vulnerability Research",
    "Security Architecture",
    "Secure Code Review",
  ];

  const designSkills = [
    "UI/UX Design",
    "3D Modeling",
    "Motion Design",
    "Interactive Experiences",
  ];

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
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">About Me</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            The <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Intersection</span> of Security & Design
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About image/animation container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <GlassCard className="overflow-hidden aspect-square relative">
              {/* Profile Image */}
              <img 
                src="https://images.unsplash.com/photo-1593376893114-1aed528d80cf?q=80&w=800&auto=format&fit=crop"
                alt="Security researcher working" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlaid design elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/80 to-transparent"></div>
              
              {/* Stats/badges */}
              <div className="absolute bottom-6 left-6 backdrop-blur-md bg-primary/50 rounded-lg px-4 py-2 flex items-center gap-2 border border-white/10">
                <FaCodeBranch className="text-accent" />
                <span>7+ Years Experience</span>
              </div>
              
              <div className="absolute top-6 right-6 backdrop-blur-md bg-primary/50 rounded-lg px-4 py-2 flex items-center gap-2 border border-white/10">
                <FaShieldAlt className="text-highlight" />
                <span>Security Expert</span>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-accent/50 transition-all mb-8"
            >
              <h3 className="font-['Space_Grotesk'] text-2xl font-medium mb-4 bg-gradient-to-r from-orange-500 to-gray-900 bg-clip-text text-transparent">
                Blending security expertise with <span className="text-accent font-bold">creative design</span>
              </h3>
              
              <p className="mb-6 text-gray-800 dark:text-orange-200">
                I specialize in the intersection of cybersecurity and design, creating secure, beautiful digital experiences that don't compromise on either front. With expertise in penetration testing, vulnerability research, and UI/UX design, I bring a unique perspective to every project.
              </p>
              
              <p className="mb-4 text-gray-800 dark:text-orange-200">
                My philosophy is that security should be beautiful, intuitive, and seamlessly integrated into the user experience. I've helped companies across fintech, healthcare, and e-commerce build products that protect users while delighting them.
              </p>

              <div className="w-full h-1 bg-gradient-to-r from-accent via-highlight to-secondary rounded-full animate-pulse"></div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-['Space_Grotesk'] font-medium text-orange-500 mb-2">Security Expertise</h4>
                <ul className="space-y-2 text-gray-800 dark:text-orange-200">
                  {securitySkills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheck className="text-orange-500 text-sm" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-['Space_Grotesk'] font-medium text-orange-600 mb-2">Design Skillset</h4>
                <ul className="space-y-2 text-gray-800 dark:text-orange-200">
                  {designSkills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheck className="text-orange-600 text-sm" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button 
              onClick={scrollToContact}
              className="hover-trigger inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-lg shadow-primary/30"
            >
              Let's Work Together
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-highlight/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
};

export default About;
