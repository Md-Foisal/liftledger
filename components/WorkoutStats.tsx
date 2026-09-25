import { Clock, Flame, Star } from "lucide-react";

type Props = {
  duration: number;
  calories: number;
  rating: number;
  // card on home uses gray icons, my plan uses lime icons
  variant?: "card" | "plan";
};

export default function WorkoutStats({ duration, calories, rating, variant = "card" }: Props) {
  const isPlan = variant === "plan";
  const iconClass = isPlan ? "text-volt" : "text-muted";
  const textClass = isPlan ? "text-[#d1d5db]" : "text-muted";

  const items = [
    { icon: Clock, text: `${duration} min`, label: "Duration" },
    { icon: Flame, text: `${calories} kcal`, label: "Calories" },
    { icon: Star, text: String(rating), label: "Rating" },
  ];

  return (
    <div className={`flex items-center ${isPlan ? "gap-3" : "gap-4"}`}>
      {items.map(({ icon: Icon, text, label }) => (
        <span key={label} className="flex items-center gap-1.5" title={label}>
          <Icon size={14} className={iconClass} aria-hidden="true" />
          <span className={`text-xs leading-4 ${textClass}`}>{text}</span>
        </span>
      ))}
    </div>
  );
}
