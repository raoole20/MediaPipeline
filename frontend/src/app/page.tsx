"use client";

import { Space_Grotesk } from "next/font/google";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { DropArea } from "./components/DropArea";
import { DropHero } from "./components/DropHero";
import { FilesSection } from "./components/FilesSection";
import { PreviewCard } from "./components/PreviewCard";
import { Sidebar } from "./components/Sidebar";
import { MockFile, NavSection, QuickFilter } from "./components/types";
import { UploadingFile, UploadProgress } from "./components/UploadProgress";
import { uploadFile } from "./server";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"] });

const NAV_SECTIONS: NavSection[] = [
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
];

const QUICK_FILTERS: QuickFilter[] = [
  { label: "Imágenes", count: 32, accent: "bg-rose-100 text-rose-700" },
  { label: "Videos", count: 12, accent: "bg-sky-100 text-sky-700" },
  { label: "Compartidos", count: 18, accent: "bg-emerald-100 text-emerald-700" },
];

const MOCK_FILES: MockFile[] = [
  { name: "Moodboard.png", type: "Imagen", size: "4.8 MB", updated: "Hoy", accent: "bg-sky-50" },
  { name: "Pitch.mov", type: "Video", size: "88 MB", updated: "Ayer", accent: "bg-violet-50" },
  { name: "Wireframe.fig", type: "Diseño", size: "2.1 MB", updated: "Hace 3 días", accent: "bg-amber-50" },
  { name: "Notas UX.pdf", type: "Documento", size: "1.3 MB", updated: "Hace 1 semana", accent: "bg-lime-50" },
  { name: "Mood reel.mp4", type: "Video", size: "120 MB", updated: "Hace 2 semanas", accent: "bg-rose-50" },
  { name: "Brief-cliente.docx", type: "Documento", size: "540 KB", updated: "Hace 1 mes", accent: "bg-cyan-50" },
];

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = "upload-input";

  const handleFileSelection = useCallback(
    async (files: FileList | null) => {
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

      const uploadId = crypto.randomUUID();
      setUploadingFiles((prev) => [
        ...prev,
        { id: uploadId, name: file.name, status: "uploading" },
      ]);

      try {
        await uploadFile(file);
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === uploadId ? { ...f, status: "success" } : f))
        );
      } catch (error) {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === uploadId ? { ...f, status: "error" } : f))
        );
      }

      // Remove from list after delay
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadId));
      }, 5000);
    },
    [previewUrl]
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

  const triggerFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={`${spaceGrotesk.className} min-h-screen from-slate-950 via-slate-900 to-slate-800 text-slate-900`}>
      <div className="mx-auto flex w-full  flex-col gap-6 px-6 py-10 lg:flex-row lg:px-12">
        <Sidebar navSections={NAV_SECTIONS} onUploadRequest={triggerFileDialog} />

        <main className="flex w-full flex-1 flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur">
          <AppHeader onUploadRequest={triggerFileDialog} />

          <section className="flex flex-col gap-6 rounded-3xl from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
            <DropHero filters={QUICK_FILTERS} />
            <DropArea onFilesSelected={handleFileSelection} inputId={inputId} />

            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleInputChange}
            />

            <PreviewCard previewUrl={previewUrl} previewName={previewName} />
          </section>

          <FilesSection files={MOCK_FILES} />
        </main>
      </div>
      <UploadProgress files={uploadingFiles} />
    </div>
  );
}
