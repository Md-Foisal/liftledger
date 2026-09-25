"use client";

import { Check, ChevronDown } from "lucide-react";

export type SortKey = "duration" | "calories" | "rating";

const options: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

type Props = {
  value: SortKey;
  onChange: (key: SortKey) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  const current = options.find((o) => o.key === value)?.label;

  function pick(key: SortKey) {
    onChange(key);
    // close the daisyui dropdown
    (document.activeElement as HTMLElement | null)?.blur();
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs leading-4 text-dim">Sort By</span>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          aria-label={`Sort by ${current}`}
          className="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-[9px] border border-line-2 bg-panel-2 px-[11px] text-xs leading-4 text-white hover:border-[#2f3442]"
        >
          {current}
          <ChevronDown size={14} className="text-muted" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-20 mt-2 w-36 rounded-xl border border-line-2 bg-panel-2 p-1.5 shadow-xl"
        >
          {options.map((o) => (
            <li key={o.key}>
              <button
                type="button"
                onClick={() => pick(o.key)}
                className={`flex items-center justify-between rounded-lg text-xs ${
                  o.key === value ? "text-volt" : "text-[#d1d5db]"
                }`}
              >
                {o.label}
                {o.key === value && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
