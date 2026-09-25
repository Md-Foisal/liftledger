import type { Metadata } from "next";
import MyPlan from "@/components/plan/MyPlan";

export const metadata: Metadata = {
  title: "My Plan",
};

export default async function MyPlanPage({ searchParams }: PageProps<"/my-plan">) {
  const { tab } = await searchParams;
  const initialTab = tab === "saved" ? "saved" : "today";

  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[30px] leading-9 font-bold tracking-[-0.75px] text-white uppercase">
          MY PLAN
        </h1>
        <p className="text-sm leading-5 text-dim">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* key makes the tab reset when navbar badge changes the url */}
      <MyPlan key={initialTab} initialTab={initialTab} />
    </main>
  );
}
