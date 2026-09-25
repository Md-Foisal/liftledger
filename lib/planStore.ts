import type { Workout } from "./api";

export type PlanItem = Workout & { done: boolean };

export type PlanState = {
  ready: boolean;
  plan: PlanItem[];
  saved: Workout[];
};

export const PLAN_CAP = 5;
const KEY = "liftledger-v1";

const serverState: PlanState = { ready: false, plan: [], saved: [] };
let state: PlanState = serverState;
const listeners = new Set<() => void>();

// read old data from localStorage one time
function load() {
  if (state.ready) return;
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : {};
    state = {
      ready: true,
      plan: Array.isArray(data.plan) ? data.plan : [],
      saved: Array.isArray(data.saved) ? data.saved : [],
    };
  } catch {
    state = { ready: true, plan: [], saved: [] };
  }
}

function update(next: Omit<PlanState, "ready">) {
  state = { ready: true, ...next };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage full or blocked, keep going in memory
  }
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  // keep tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    state = { ...state, ready: false };
    load();
    fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot() {
  load();
  return state;
}

export function getServerSnapshot() {
  return serverState;
}

// how many lifts are still left to do today
export function activeCount(plan: PlanItem[]) {
  return plan.filter((w) => !w.done).length;
}

export function addToPlan(w: Workout): "added" | "exists" | "full" {
  load();
  if (state.plan.some((p) => p.id === w.id)) return "exists";
  if (activeCount(state.plan) >= PLAN_CAP) return "full";
  update({ plan: [...state.plan, { ...w, done: false }], saved: state.saved });
  return "added";
}

export function saveForLater(w: Workout): "saved" | "exists" {
  load();
  if (state.saved.some((s) => s.id === w.id)) return "exists";
  update({ plan: state.plan, saved: [...state.saved, w] });
  return "saved";
}

export function markDone(id: number) {
  update({
    plan: state.plan.map((p) => (p.id === id ? { ...p, done: true } : p)),
    saved: state.saved,
  });
}

export function removeFromPlan(id: number) {
  update({ plan: state.plan.filter((p) => p.id !== id), saved: state.saved });
}

export function removeFromSaved(id: number) {
  update({ plan: state.plan, saved: state.saved.filter((s) => s.id !== id) });
}
