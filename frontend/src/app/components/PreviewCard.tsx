"use client";

type PreviewCardProps = {
  previewUrl: string | null;
  previewName: string | null;
};

export function PreviewCard({ previewUrl, previewName }: PreviewCardProps) {
  if (!previewUrl) {
    return <p className="text-center text-sm text-white/60">Aún no has seleccionado ningún archivo. Arrastra uno para verlo aquí.</p>;
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white/10 p-4 md:flex-row md:items-center">
      <div className="overflow-hidden rounded-2xl bg-slate-900/40 p-3">
        <div className="h-32 w-32 overflow-hidden rounded-2xl bg-slate-900/20">
          <img src={previewUrl} alt={previewName ?? "Vista previa"} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex-1 text-sm">
        <p className="text-base font-semibold text-white">{previewName}</p>
        <p className="text-white/70">Archivo listo para subir cuando lo necesites.</p>
        <p className="text-white/50">(Solo permanece en tu navegador).</p>
      </div>
    </div>
  );
}
