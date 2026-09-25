import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <Logo size={48} className="mb-6 rotate-12" />
      <p className="text-[11px] leading-4 font-bold tracking-[1.1px] text-lime uppercase">Error 404</p>
      <h1 className="mt-3 font-display text-6xl leading-none font-bold tracking-[-1.5px] text-white uppercase sm:text-8xl">
        MISSED REP
      </h1>
      <p className="mt-4 max-w-md text-base leading-6 text-muted">
        This page does not exist. Maybe the link is broken or the workout was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-xs leading-4 font-bold tracking-[0.3px] text-black uppercase transition hover:brightness-110"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back to workouts
      </Link>
    </main>
  );
}
