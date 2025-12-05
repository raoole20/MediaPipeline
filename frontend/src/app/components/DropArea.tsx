"use client";

import { DragEvent, useCallback, useState } from "react";

type DropAreaProps = {
  onFilesSelected: (files: FileList | null) => void;
  inputId: string;
};

export function DropArea({ onFilesSelected, inputId }: DropAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setIsDragging(false);
      onFilesSelected(event.dataTransfer.files);
    },
    [onFilesSelected]
  );

  return (
    <label
      htmlFor={inputId}
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
  );
}
