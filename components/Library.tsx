import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default async function Library() {
  const workouts = await getWorkouts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((w) => (
        <WorkoutCard key={w.id} workout={w} />
      ))}
    </div>
  );
}
