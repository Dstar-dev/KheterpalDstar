import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/ui/project-card";
import { projects } from "@/lib/data";

type ProjectCategory = "all" | "security" | "design" | "interactive";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-primary/30">
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
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            A selection of my work across security research, UI/UX design, and interactive experiences.
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
          <button 
            className={cn(
              "hover-trigger px-5 py-2 rounded-md backdrop-blur-md bg-primary/30 border transition-all",
              activeFilter === "all" 
                ? "border-accent text-accent"
                : "border-transparent hover:border-accent/70"
            )}
            onClick={() => handleFilterChange("all")}
          >
            All Projects
          </button>
          <button 
            className={cn(
              "hover-trigger px-5 py-2 rounded-md backdrop-blur-md bg-primary/30 border transition-all",
              activeFilter === "security" 
                ? "border-accent text-accent"
                : "border-transparent hover:border-accent/70"
            )}
            onClick={() => handleFilterChange("security")}
          >
            Security
          </button>
          <button 
            className={cn(
              "hover-trigger px-5 py-2 rounded-md backdrop-blur-md bg-primary/30 border transition-all",
              activeFilter === "design" 
                ? "border-accent text-accent"
                : "border-transparent hover:border-accent/70"
            )}
            onClick={() => handleFilterChange("design")}
          >
            UI/UX Design
          </button>
          <button 
            className={cn(
              "hover-trigger px-5 py-2 rounded-md backdrop-blur-md bg-primary/30 border transition-all",
              activeFilter === "interactive" 
                ? "border-accent text-accent"
                : "border-transparent hover:border-accent/70"
            )}
            onClick={() => handleFilterChange("interactive")}
          >
            Interactive
          </button>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              category={project.categoryName}
              tags={project.tags}
              imageUrl={project.imageUrl}
              link={project.link}
              accentColor={project.accentColor}
              tagBgColor={project.tagBgColor}
            />
          ))}
        </div>
        
        {/* View All Projects Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a 
            href="#" 
            className="hover-trigger inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-accent hover:bg-accent/10 text-white font-semibold transition-all"
          >
            View All Projects
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-40 -left-20 w-60 h-60 bg-secondary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-60 h-60 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
};

export default Projects;
