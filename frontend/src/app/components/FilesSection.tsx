"use client";

import { MockFile } from "./types";

type FilesSectionProps = {
  files: MockFile[];
};

export function FilesSection({ files }: FilesSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Tus archivos</h2>
        <button className="text-sm font-semibold text-slate-500 transition hover:text-slate-900">Ver todo</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {files.map((file) => (
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
  );
}
