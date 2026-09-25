import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { Workout } from "@/lib/api";
import WorkoutStats from "../WorkoutStats";

type Props = {
  workout: Workout;
  done?: boolean;
  // saved tab has no mark as done button
  onDone?: () => void;
  onRemove: () => void;
};

export default function PlanCard({ workout, done = false, onDone, onRemove }: Props) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line-2 bg-[#14171e] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-[17px]">
      <div className={`flex items-center gap-4 ${done ? "opacity-60" : ""}`}>
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#1f2937] sm:w-36">
          <Image src={workout.image} alt={workout.name} fill sizes="144px" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2
            className={`font-display text-base leading-6 font-bold tracking-[0.4px] text-white uppercase ${
              done ? "line-through decoration-volt decoration-2" : ""
            }`}
          >
            {workout.name}
          </h2>
          <p className="text-xs leading-4 font-semibold text-dim">{workout.equipment}</p>
          <div className="pt-1.5">
            <WorkoutStats
              duration={workout.duration}
              calories={workout.caloriesBurned}
              rating={workout.rating}
              variant="plan"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex h-[34px] items-center rounded-full border border-[#374151] px-[18px] text-xs leading-4 whitespace-nowrap text-white transition hover:border-volt"
        >
          View Details
        </Link>

        {onDone &&
          (done ? (
            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-volt/40 px-4 text-xs leading-4 font-semibold whitespace-nowrap text-volt">
              <Check size={14} />
              Done
            </span>
          ) : (
            <button
              type="button"
              onClick={onDone}
              className="inline-flex h-8 items-center gap-2 rounded-full bg-volt px-4 text-xs leading-4 font-semibold whitespace-nowrap text-black shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110 active:scale-[0.97]"
            >
              <Check size={14} strokeWidth={2.5} />
              Mark as Done
            </button>
          ))}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="ml-auto rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-white sm:ml-0"
        >
          <X size={16} />
        </button>
      </div>
    </article>
  );
}
