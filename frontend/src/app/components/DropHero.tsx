"use client";

import { QuickFilter } from "./types";
import { QuickFilterChips } from "./QuickFilterChips";

type DropHeroProps = {
  filters: QuickFilter[];
};

export function DropHero({ filters }: DropHeroProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Drop zone</p>
        <h2 className="text-2xl font-semibold">Arrastra tus archivos creativos</h2>
        <p className="text-sm text-white/70">Solo se previsualiza localmente, no se envía nada al servidor.</p>
      </div>
      <QuickFilterChips filters={filters} />
    </div>
  );
}
