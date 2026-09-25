import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/api";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-lime/40"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 394px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-lime px-2.5 py-0.5 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] text-black uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="pt-2 font-display text-lg leading-7 font-bold tracking-[0.45px] text-white uppercase">
            {workout.name}
          </h3>
          <p className="text-xs leading-4 text-muted">{workout.equipment}</p>
        </div>

        <div className="mt-4 border-t border-[#20242e] pt-[13px]">
          <WorkoutStats
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
