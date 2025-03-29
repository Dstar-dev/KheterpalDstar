import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  link: string;
  accentColor: string;
  tagBgColor: string;
}

const ProjectCard = ({
  title,
  description,
  category,
  tags,
  imageUrl,
  link,
  accentColor,
  tagBgColor,
}: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.12,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 0.2
      }
    }
  };

  const tagStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="card card-3d card-hover backdrop-blur-md bg-white/5 rounded-xl overflow-hidden transition-all border border-white/10 hover:bg-white/10"
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, margin: "-50px" }}
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-offset="100"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80"></div>
        <motion.div 
          className={`absolute top-4 right-4 backdrop-blur-md bg-primary/50 px-3 py-1 rounded-full text-xs font-medium text-${accentColor}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {category}
        </motion.div>
      </div>

      <div className="p-6">
        <motion.h3 
          className={`font-['Space_Grotesk'] text-xl font-bold mb-2 group-hover:text-${accentColor} transition-colors`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-sm text-white/80 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          variants={tagStaggerVariants}
          initial="hidden"
          animate="visible"
        >
          {tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className={`px-2 py-1 ${tagBgColor} text-${accentColor} text-xs rounded-md`}
              variants={tagVariants}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.a
          href={link}
          className={`link-underline inline-flex items-center gap-1 text-${accentColor} text-sm font-medium`}
          whileHover={{ color: `var(--color-primary)` }}
        >
          View Case Study 
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaArrowRight className="text-xs" />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
