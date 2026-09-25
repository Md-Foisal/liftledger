import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import DetailActions from "@/components/DetailActions";
import { getWorkout } from "@/lib/api";

export async function generateMetadata({ params }: PageProps<"/workouts/[id]">): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkout(id);
  return { title: workout ? workout.name : "Workout not found" };
}

export default async function WorkoutDetails({ params }: PageProps<"/workouts/[id]">) {
  const { id } = await params;
  const workout = await getWorkout(id);

  // wrong id goes to our 404 page
  if (!workout) notFound();

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        {/* left side - big image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:aspect-[4/5] lg:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-cover"
          />
        </div>

        {/* right side - info and buttons */}
        <div className="flex flex-col">
          <h1 className="pb-3 font-display text-3xl leading-10 font-bold tracking-[-0.9px] text-white uppercase sm:text-4xl">
            {workout.name}
          </h1>
          <p className="max-w-[576px] pb-5 text-base leading-6 text-muted">{workout.description}</p>

          <div className="flex flex-wrap gap-2.5 pb-7">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-volt px-3.5 py-1 text-xs leading-4 font-semibold text-[#0f1115]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-8 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
            {specs.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 px-6 py-3.5 ${i > 0 ? "border-t border-[#1e2330]" : ""}`}
              >
                <span className="text-xs leading-4 font-bold tracking-[0.6px] text-muted uppercase">
                  {row.label}
                </span>
                <span className="text-right text-sm leading-5 font-medium text-[#e5e7eb]">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mb-9 flex flex-col gap-4">
            <h2 className="text-base leading-6 font-extrabold tracking-[0.8px] text-white uppercase">
              INSTRUCTIONS
            </h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={step} className="flex text-sm leading-[22.75px]">
                  <span className="shrink-0 pr-2 text-muted">{i + 1}.</span>
                  <span className="text-[#d1d5db]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <DetailActions workout={workout} />
        </div>
      </div>
    </main>
  );
}
