export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// get all 12 workouts for the home page
export async function getWorkouts(): Promise<Workout[]> {
  // no-store so the list is always fresh and the loader can show
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load workouts");
  return res.json();
}

// get one workout, returns null if the id is wrong
export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Could not load this workout");
  return res.json();
}
