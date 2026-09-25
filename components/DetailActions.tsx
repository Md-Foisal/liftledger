"use client";

import { Bookmark, BookmarkCheck, CalendarCheck, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import type { Workout } from "@/lib/api";
import usePlan from "@/hooks/usePlan";
import { PLAN_CAP, activeCount, addToPlan, saveForLater } from "@/lib/planStore";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { ready, plan, saved } = usePlan();

  const inPlan = plan.some((p) => p.id === workout.id);
  const isSaved = saved.some((s) => s.id === workout.id);
  const planFull = !inPlan && activeCount(plan) >= PLAN_CAP;

  function handleAdd() {
    const result = addToPlan(workout);
    if (result === "added") toast.success(`Added to today's plan`, { description: workout.name });
    else if (result === "exists") toast.info("Already in today's plan");
    else toast.error("Plan is full", { description: "Cap is five lifts. Finish one first." });
  }

  function handleSave() {
    const result = saveForLater(workout);
    if (result === "saved") toast.success("Saved for later", { description: workout.name });
    else toast.info("Already in your saved list");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!ready || inPlan || planFull}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-6 py-3 text-sm leading-5 font-semibold text-[#0f1115] shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
        >
          {inPlan ? <CalendarCheck size={16} /> : <CalendarPlus size={16} />}
          {inPlan ? "Added to today's plan" : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={!ready || isSaved}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#374151] px-[25px] py-[13px] text-sm leading-5 font-medium text-[#e5e7eb] transition hover:border-volt hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[#374151]"
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          {isSaved ? "Saved" : "Save for later"}
        </button>
      </div>

      {planFull && (
        <p className="text-xs text-muted">
          Today&apos;s plan already has {PLAN_CAP} lifts. Mark one as done to add more.
        </p>
      )}
    </div>
  );
}
