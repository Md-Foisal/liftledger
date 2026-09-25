"use client";

import { RotateCw } from "lucide-react";

// shows when the api is down or something breaks
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-white uppercase">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted">We could not load the workouts. Check your internet and try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-xs font-bold text-black uppercase"
      >
        <RotateCw size={16} />
        Try again
      </button>
    </main>
  );
}
