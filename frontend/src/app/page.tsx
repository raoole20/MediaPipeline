"use client";

import { Space_Grotesk } from "next/font/google";
import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickFilters = useMemo(
    () => [
      { label: "Imágenes", count: 32, accent: "bg-rose-100 text-rose-700" },
      { label: "Videos", count: 12, accent: "bg-sky-100 text-sky-700" },
      { label: "Compartidos", count: 18, accent: "bg-emerald-100 text-emerald-700" },
    ],
    []
  );

  const mockFiles = useMemo(
    () => [
      { name: "Moodboard.png", type: "Imagen", size: "4.8 MB", updated: "Hoy", accent: "bg-sky-50" },
      { name: "Pitch.mov", type: "Video", size: "88 MB", updated: "Ayer", accent: "bg-violet-50" },
      { name: "Wireframe.fig", type: "Diseño", size: "2.1 MB", updated: "Hace 3 días", accent: "bg-amber-50" },
      { name: "Notas UX.pdf", type: "Documento", size: "1.3 MB", updated: "Hace 1 semana", accent: "bg-lime-50" },
      { name: "Mood reel.mp4", type: "Video", size: "120 MB", updated: "Hace 2 semanas", accent: "bg-rose-50" },
      { name: "Brief-cliente.docx", type: "Documento", size: "540 KB", updated: "Hace 1 mes", accent: "bg-cyan-50" },
    ],
    []
  );

  const navSections = useMemo(
    () => [
      {
        title: "Mi unidad",
        items: [
          { label: "Todos los archivos", active: true },
          { label: "Recientes" },
          { label: "Destacados" },
          { label: "Compartidos conmigo" },
        ],
      },
      {
        title: "Accesos rápidos",
        items: [
          { label: "Campaña Primavera" },
          { label: "Pitch 2025" },
          { label: "Moodboards" },
        ],
      },
    ],
    []
  );

  const handleFileSelection = useCallback(
    (files: FileList | null) => {
      if (!files?.length) {
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const file = files[0];
      const nextUrl = URL.createObjectURL(file);
      setPreviewUrl(nextUrl);
      setPreviewName(file.name);
    },
    [previewUrl]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setIsDragging(false);
      handleFileSelection(event.dataTransfer.files);
    },
    [handleFileSelection]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleFileSelection(event.target.files);
      event.target.value = "";
    },
    [handleFileSelection]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-900`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:px-12">
        <aside className="hidden w-full max-w-sm flex-col gap-8 rounded-3xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur lg:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-semibold">
              MP
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Media</p>
              <p className="text-lg font-semibold">Pipeline Drive</p>
            </div>
          </div>
          <button
            className="flex items-center justify-center rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            onClick={() => inputRef.current?.click()}
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

        <main className="flex w-full flex-1 flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur">
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
                onClick={() => inputRef.current?.click()}
              >
                Subir archivo
              </button>
            </div>
          </header>

          <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Drop zone</p>
                <h2 className="text-2xl font-semibold">Arrastra tus archivos creativos</h2>
                <p className="text-sm text-white/70">Solo se previsualiza localmente, no se envía nada al servidor.</p>
              </div>
              <div className="flex gap-2">
                {quickFilters.map((chip) => (
                  <span
                    key={chip.label}
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${chip.accent}`}
                  >
                    {chip.label} · {chip.count}
                  </span>
                ))}
              </div>
            </div>

            <label
              htmlFor="upload-input"
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              className={`group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-12 text-center transition ${
                isDragging ? "border-sky-400 bg-slate-800" : "border-white/30 bg-white/5"
              }`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">☁️</div>
              <p className="text-lg font-semibold">Arrastra y suelta tu archivo aquí</p>
              <p className="text-sm text-white/70">Formatos recomendados: PNG, JPG, MP4</p>
              <span className="mt-4 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition group-hover:bg-white/20">
                o haz clic para elegir
              </span>
            </label>

            <input
              ref={inputRef}
              id="upload-input"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleInputChange}
            />

            {previewUrl ? (
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
            ) : (
              <p className="text-center text-sm text-white/60">
                Aún no has seleccionado ningún archivo. Arrastra uno para verlo aquí.
              </p>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Tus archivos</h2>
              <button className="text-sm font-semibold text-slate-500 transition hover:text-slate-900">Ver todo</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mockFiles.map((file) => (
                <article
                  key={file.name}
                  className={`rounded-2xl border border-slate-100 ${file.accent} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{file.name}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{file.type}</p>
                    </div>
                    <span className="text-xs text-slate-600">{file.size}</span>
                  </div>
                  <p className="mt-6 text-xs text-slate-500">Actualizado: {file.updated}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
