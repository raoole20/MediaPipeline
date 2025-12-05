"use client";

import { QuickFilter } from "./types";

type QuickFilterChipsProps = {
  filters: QuickFilter[];
};

export function QuickFilterChips({ filters }: QuickFilterChipsProps) {
  return (
    <div className="flex gap-2">
      {filters.map((chip) => (
        <span key={chip.label} className={`rounded-full px-4 py-2 text-xs font-semibold ${chip.accent}`}>
          {chip.label} · {chip.count}
        </span>
      ))}
    </div>
  );
}
