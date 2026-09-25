"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import usePlan from "@/hooks/usePlan";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  // details page is part of workouts too
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workouts")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1f26] bg-[rgba(12,13,16,0.95)] backdrop-blur-[2px]">
      <nav className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-y-3 px-4 py-4 sm:px-6 md:h-20 md:flex-nowrap md:py-0">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FitLog home">
          <Logo size={28} />
          <span className="font-display text-lg leading-7 font-bold tracking-[0.9px] text-white uppercase">
            FITLOG
          </span>
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-1 md:order-none md:w-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-xs leading-4 transition-colors ${
                isActive(link.href)
                  ? "bg-[#1a2312] font-semibold text-lime"
                  : "font-medium text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/my-plan" className="group flex items-center gap-2" aria-label={`Plan: ${plan.length}`}>
            <span className="text-xs leading-4 font-medium text-[#d1d5db] group-hover:text-white">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1.5 text-[11px] leading-4 font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan?tab=saved" className="group flex items-center gap-2" aria-label={`Saved: ${saved.length}`}>
            <span className="text-xs leading-4 font-medium text-muted group-hover:text-white">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2d313b] px-1.5 text-[11px] leading-4 font-medium text-[#d1d5db]">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
