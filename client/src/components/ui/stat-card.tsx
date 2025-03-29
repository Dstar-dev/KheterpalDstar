import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  accentColor: string;
  animationDelay?: number;
}

const StatCard = ({ value, label, accentColor, animationDelay = 0 }: StatCardProps) => {
  return (
    <div
      className="bg-primary/30 rounded-lg p-4 border border-white/10 hover:border-white/20"
    >
      <h3 className={`font-['Space_Grotesk'] text-4xl font-bold text-${accentColor}`}>{value}</h3>
      <p className="text-sm text-white/80">{label}</p>
    </div>
  );
};

export default StatCard;
