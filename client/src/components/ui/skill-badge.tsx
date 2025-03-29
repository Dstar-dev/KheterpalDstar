import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

const SkillBadge = ({ label, className }: SkillBadgeProps) => {
  return (
    <span className={cn(
      "backdrop-blur-md bg-primary/50 px-3 py-1 rounded-full text-sm border border-white/10",
      className
    )}>
      {label}
    </span>
  );
};

export default SkillBadge;
