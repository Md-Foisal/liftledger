"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/planStore";

// plan + saved lists, shared by navbar, details and my plan page
export default function usePlan() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
