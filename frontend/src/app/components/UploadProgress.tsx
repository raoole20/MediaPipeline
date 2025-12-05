"use client";

export type UploadStatus = "uploading" | "success" | "error";

export type UploadingFile = {
  id: string;
  name: string;
  status: UploadStatus;
};

type UploadProgressProps = {
  files: UploadingFile[];
};

export function UploadProgress({ files }: UploadProgressProps) {
  if (files.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex w-80 items-center justify-between rounded-xl bg-slate-900 p-4 text-white shadow-xl shadow-slate-900/20 transition-all"
        >
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium" title={file.name}>
              {file.name}
            </span>
            <span className="text-xs text-slate-400">
              {file.status === "uploading" && "Subiendo..."}
              {file.status === "success" && "Completado"}
              {file.status === "error" && "Error"}
            </span>
          </div>
          <div className="ml-4 flex-shrink-0">
            {file.status === "uploading" && (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            )}
            {file.status === "success" && <span className="text-lg text-emerald-400">✓</span>}
            {file.status === "error" && <span className="text-lg text-rose-400">✕</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
