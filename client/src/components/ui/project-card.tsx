import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group backdrop-blur-md bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 border border-white/10 hover:bg-white/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80"></div>
        <div className={`absolute top-4 right-4 backdrop-blur-md bg-primary/50 px-3 py-1 rounded-full text-xs font-medium text-${accentColor}`}>
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className={`font-['Space_Grotesk'] text-xl font-bold mb-2 group-hover:text-${accentColor} transition-colors`}>
          {title}
        </h3>
        <p className="text-sm text-white/80 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className={`px-2 py-1 ${tagBgColor} text-${accentColor} text-xs rounded-md`}>
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className={`hover-trigger inline-flex items-center gap-1 text-${accentColor} text-sm font-medium`}
        >
          View Case Study <FaArrowRight className="text-xs" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
