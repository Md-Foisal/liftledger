import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1a1d24] bg-[#090a0d] py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={20} />
          <span className="font-display text-sm leading-5 font-bold tracking-[0.7px] text-white uppercase">
            FITLOG
          </span>
        </Link>
        <p className="text-xs leading-4 text-[#6b7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
