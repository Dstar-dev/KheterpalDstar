import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/lib/data";

type ProjectCategory = "all" | "security" | "design" | "interactive";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter projects when activeFilter changes
  useEffect(() => {
    const filterProjects = () => {
      if (activeFilter === "all") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === activeFilter));
      }
    };
    
    // Add slight delay for animation purposes
    const timer = setTimeout(() => {
      filterProjects();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const activeButtonVariants = {
    initial: {
      boxShadow: "0 0 0 0 rgba(255, 77, 0, 0)"
    },
    active: {
      boxShadow: "0 0 15px 2px rgba(255, 77, 0, 0.3)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">Portfolio</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            Featured <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            A curated selection of my work showcasing security research, UI/UX design, and interactive experiences.
          </p>
        </motion.div>
        
        {/* Project Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={cn(
              "px-5 py-2 rounded-md border-2 transition-all duration-300 hover-lift",
              activeFilter === "all" 
                ? "border-primary text-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            )}
            onClick={() => handleFilterChange("all")}
          >
            All Projects
          </motion.button>
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={cn(
              "px-5 py-2 rounded-md border-2 transition-all duration-300 hover-lift",
              activeFilter === "security" 
                ? "border-primary text-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            )}
            onClick={() => handleFilterChange("security")}
          >
            Security
          </motion.button>
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={cn(
              "px-5 py-2 rounded-md border-2 transition-all duration-300 hover-lift",
              activeFilter === "design" 
                ? "border-primary text-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            )}
            onClick={() => handleFilterChange("design")}
          >
            UI/UX Design
          </motion.button>
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={cn(
              "px-5 py-2 rounded-md border-2 transition-all duration-300 hover-lift",
              activeFilter === "interactive" 
                ? "border-primary text-primary bg-primary/5"
                : "border-gray-300 hover:border-primary"
            )}
            onClick={() => handleFilterChange("interactive")}
          >
            Interactive
          </motion.button>
        </div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {filteredProjects.map((project, index) => (
              <div key={index} style={{animationDelay: `${index * 150}ms`}}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  category={project.categoryName}
                  tags={project.tags}
                  imageUrl={project.imageUrl}
                  link={project.link}
                  accentColor={project.accentColor}
                  tagBgColor={project.tagBgColor}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All Projects Button */}
        <div 
          className="mt-16 text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
          data-aos-offset="0"
        >
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href="#" 
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold"
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop", 
                ease: "easeInOut"
              }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-20">
        <motion.div 
          className="w-full h-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-secondary rounded-full filter blur-3xl opacity-30">
        <motion.div 
          className="w-full h-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl pointer-events-none">
        <motion.div 
          className="w-full h-full border border-primary/10 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [0.8, 1, 0.8]
          }}
          transition={{ 
            rotate: {
              duration: 30, 
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </div>
    </section>
  );
};

export default Projects;
