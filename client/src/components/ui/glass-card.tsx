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
        "bg-primary/30 rounded-xl border border-white/10",
        glowEffect && "shadow-md shadow-accent/10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
