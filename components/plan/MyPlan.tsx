"use client";

import { useState } from "react";
import { toast } from "sonner";
import usePlan from "@/hooks/usePlan";
import type { Workout } from "@/lib/api";
import { markDone, removeFromPlan, removeFromSaved } from "@/lib/planStore";
import Loader from "../Loader";
import EmptyState from "./EmptyState";
import PlanCard from "./PlanCard";
import PlanStats from "./PlanStats";
import SortDropdown, { type SortKey } from "./SortDropdown";

export type Tab = "today" | "saved";

// duration: short first, calories and rating: high first
function sortList<T extends Workout>(list: T[], key: SortKey) {
  const copy = [...list];
  if (key === "duration") return copy.sort((a, b) => a.duration - b.duration);
  if (key === "calories") return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  return copy.sort((a, b) => b.rating - a.rating);
}

export default function MyPlan({ initialTab }: { initialTab: Tab }) {
  const { ready, plan, saved } = usePlan();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  function changeTab(next: Tab) {
    setTab(next);
    // keep the url in sync so reload opens the same tab
    window.history.replaceState(null, "", next === "saved" ? "/my-plan?tab=saved" : "/my-plan");
  }

  function handleDone(w: Workout) {
    markDone(w.id);
    toast.success("Nice work! Marked as done", { description: w.name });
  }

  function handleRemovePlan(w: Workout) {
    removeFromPlan(w.id);
    toast.success(`Removed from today's plan`, { description: w.name });
  }

  function handleRemoveSaved(w: Workout) {
    removeFromSaved(w.id);
    toast.success("Removed from saved", { description: w.name });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "today", label: "Today's Plan" },
    { key: "saved", label: "Saved" },
  ];

  const sortedPlan = sortList(plan, sortBy);
  const sortedSaved = sortList(saved, sortBy);
  const list = tab === "today" ? sortedPlan : sortedSaved;

  return (
    <div className="flex flex-col gap-6">
      <PlanStats exercises={plan.length} minutes={minutes} calories={calories} />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div role="tablist" className="flex items-center gap-1 rounded-xl border border-line-2 bg-[#151921] p-[5px]">
          {tabs.map((t) => {
            const active = tab === t.key;
            const count = t.key === "today" ? plan.length : saved.length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => changeTab(t.key)}
                className={`rounded-lg border text-xs leading-4 transition ${
                  active
                    ? "border-[#2b303d] bg-[#1f242d] px-[17px] py-[7px] font-bold text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                    : "border-transparent px-4 py-1.5 text-dim hover:text-white"
                }`}
              >
                {t.label}
                {ready && count > 0 && <span className="ml-1.5 text-[11px] text-volt">{count}</span>}
              </button>
            );
          })}
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {!ready ? (
        <Loader />
      ) : list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {tab === "today"
            ? sortedPlan.map((w) => (
                <PlanCard
                  key={w.id}
                  workout={w}
                  done={w.done}
                  onDone={() => handleDone(w)}
                  onRemove={() => handleRemovePlan(w)}
                />
              ))
            : sortedSaved.map((w) => (
                <PlanCard key={w.id} workout={w} onRemove={() => handleRemoveSaved(w)} />
              ))}
        </div>
      )}
    </div>
  );
}
