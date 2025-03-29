import { cn } from "@/lib/utils";

interface ProgressCardProps {
  skill: string;
  level: string;
  percentage: number;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const ProgressCard = ({
  skill,
  level,
  percentage,
  accentColor,
  gradientFrom,
  gradientTo,
}: ProgressCardProps) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill}</span>
        <span className={`text-${accentColor}`}>{level}</span>
      </div>
      <div className="h-2 bg-primary/50 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full", 
            `bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
