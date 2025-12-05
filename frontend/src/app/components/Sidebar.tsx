"use client";

import { NavSection } from "./types";

type SidebarProps = {
  navSections: NavSection[];
  onUploadRequest: () => void;
};

export function Sidebar({ navSections, onUploadRequest }: SidebarProps) {
  return (
    <aside className="hidden w-full max-w-sm flex-col gap-8 rounded-3xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur lg:flex">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-semibold">MP</span>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Media</p>
          <p className="text-lg font-semibold">Pipeline Drive</p>
        </div>
      </div>
      <button
        className="flex items-center justify-center rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
        onClick={onUploadRequest}
      >
        + Nuevo archivo
      </button>
      <div className="space-y-6 text-sm">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-xs uppercase tracking-wide text-white/50">{section.title}</p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li
                  key={item.label}
                  className={`rounded-2xl px-3 py-2 transition hover:bg-white/10 ${item.active ? "bg-white/15" : ""}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white/5 p-4 text-xs text-white/70">
        <p className="mb-1 text-sm font-semibold text-white">Almacenamiento</p>
        <div className="mb-2 flex items-center justify-between text-white">
          <span>128 GB usados</span>
          <span className="text-white/70">/ 200 GB</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" />
        </div>
      </div>
    </aside>
  );
}
