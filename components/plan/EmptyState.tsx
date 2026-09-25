import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#111317]/50 px-4 py-16 text-center">
      <h2 className="font-display text-xl leading-5 font-bold tracking-[0.5px] text-white uppercase">
        NOTHING HERE YET
      </h2>
      <p className="mt-2 text-xs leading-4 text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex items-center rounded-full bg-volt px-5 py-2 text-xs leading-4 font-semibold text-black shadow-[0_6px_20px_rgba(204,255,0,0.25)] transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </div>
  );
}
