"use client";

import { useState } from "react";
import usePlan from "@/hooks/usePlan";
import Loader from "../Loader";
import EmptyState from "./EmptyState";
import PlanCard from "./PlanCard";
import PlanStats from "./PlanStats";

export type Tab = "today" | "saved";

export default function MyPlan({ initialTab }: { initialTab: Tab }) {
  const { ready, plan, saved } = usePlan();
  const [tab, setTab] = useState<Tab>(initialTab);

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  function changeTab(next: Tab) {
    setTab(next);
    // keep the url in sync so reload opens the same tab
    window.history.replaceState(null, "", next === "saved" ? "/my-plan?tab=saved" : "/my-plan");
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "today", label: "Today's Plan" },
    { key: "saved", label: "Saved" },
  ];

  const list = tab === "today" ? plan : saved;

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

      </div>

      {!ready ? (
        <Loader />
      ) : list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((w) => (
            <PlanCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </div>
  );
}
