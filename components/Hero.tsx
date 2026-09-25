import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse items-center gap-8 rounded-2xl border border-line bg-panel p-6 sm:p-10 md:flex-row md:justify-between lg:p-[57px]">
      <div className="flex w-full max-w-[576px] flex-col items-start gap-5">
        <p className="text-[11px] leading-[16.5px] font-bold tracking-[1.1px] text-lime uppercase">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-[40px] leading-[1] font-bold tracking-[-1px] text-white uppercase sm:text-5xl lg:text-[60px] lg:tracking-[-1.5px]">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="max-w-[512px] text-base leading-6 text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-lime px-6 py-3 text-xs leading-4 font-bold tracking-[0.3px] text-black uppercase shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110 active:scale-[0.98]"
        >
          BROWSE WORKOUTS
          <ArrowDown size={16} strokeWidth={2.5} />
        </a>
      </div>

      <Image
        src="/banner.png"
        alt="Muscle figure training on a preacher curl machine"
        width={334}
        height={334}
        priority
        className="h-auto w-56 shrink-0 sm:w-64 md:w-[280px] lg:w-[334px]"
      />
    </section>
  );
}
