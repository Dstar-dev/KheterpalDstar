import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  accentColor: string;
  animationDelay?: number;
}

const StatCard = ({ value, label, accentColor, animationDelay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: animationDelay, ease: "easeOut" }}
      className="backdrop-blur-md bg-primary/30 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
      style={{
        animation: `float 6s ease-in-out infinite ${animationDelay}s`,
      }}
    >
      <h3 className={`font-['Space_Grotesk'] text-4xl font-bold text-${accentColor}`}>{value}</h3>
      <p className="text-sm text-white/80">{label}</p>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        `
      }} />
    </motion.div>
  );
};

export default StatCard;
