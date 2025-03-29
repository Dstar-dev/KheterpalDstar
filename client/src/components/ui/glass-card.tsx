import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowEffect?: boolean;
}

const GlassCard = ({ children, className, glowEffect = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur-xl hover:shadow-xl transition-shadow duration-300",
        glowEffect && "animate-glow",
        className
      )}
    >
      {children}

      {glowEffect && (
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.3); }
            100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite alternate;
          }
          `
        }} />
      )}
    </div>
  );
};

export default GlassCard;