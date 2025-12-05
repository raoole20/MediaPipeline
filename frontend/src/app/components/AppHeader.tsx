"use client";

type AppHeaderProps = {
  onUploadRequest: () => void;
};

export function AppHeader({ onUploadRequest }: AppHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Mi unidad</p>
        <h1 className="text-3xl font-semibold text-slate-900">Panel creativo</h1>
      </div>
      <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-500 focus-within:border-slate-400">
          <span className="text-slate-400">⌕</span>
          <input
            type="search"
            placeholder="Buscar archivos"
            className="w-full bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={onUploadRequest}
        >
          Subir archivo
        </button>
      </div>
    </header>
  );
}
