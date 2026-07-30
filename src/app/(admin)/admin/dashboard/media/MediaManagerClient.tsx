"use client";

import { useState, useEffect } from "react";
import { uploadMediaAction, deleteMediaAction, listMediaAction } from "@/actions/media";

export default function MediaManagerClient() {
  const [activeBucket, setActiveBucket] = useState("images");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const buckets = [
    { value: "images", label: "Images & Gallery" },
    { value: "videos", label: "Videos" },
    { value: "reels", label: "Vertical Reels" },
    { value: "logos", label: "Client Logos" },
    { value: "resume", label: "Resume PDFs" },
  ];

  const fetchFiles = async (bucket: string) => {
    setLoading(true);
    setStatusMsg("");
    try {
      const res = await listMediaAction(bucket);
      if (res.success) {
        setFiles(res.files);
      } else {
        setStatusMsg(`Failed to list files: ${res.error}`);
      }
    } catch (e) {
      setStatusMsg("Error listing files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(activeBucket);
  }, [activeBucket]);

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("bucket", activeBucket);
    formData.append("file", file);

    try {
      const res = await uploadMediaAction(formData);
      if (res.success) {
        setStatusMsg(`Uploaded successfully!`);
        fetchFiles(activeBucket);
        e.currentTarget.reset();
      } else {
        setStatusMsg(`Upload failed: ${res.error}`);
      }
    } catch (error) {
      setStatusMsg("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;
    setLoading(true);

    try {
      const res = await deleteMediaAction(activeBucket, fileName);
      if (res.success) {
        setStatusMsg("Deleted file successfully");
        fetchFiles(activeBucket);
      } else {
        setStatusMsg(`Delete failed: ${res.error}`);
      }
    } catch (error) {
      setStatusMsg("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Public URL copied to clipboard!");
  };

  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-sm text-ink-dim mt-1.5">
          Upload and manage direct assets across your storage buckets.
        </p>
      </div>

      {statusMsg && (
        <p className="text-xs font-mono text-gold-soft uppercase tracking-wider bg-white/5 p-3 rounded-lg">
          {statusMsg}
        </p>
      )}

      {/* Bucket Filter tabs */}
      <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
        {buckets.map((b) => (
          <button
            key={b.value}
            onClick={() => setActiveBucket(b.value)}
            className={`px-4.5 py-2.5 rounded-full text-[13px] border border-white/9 transition-all duration-300 ${
              activeBucket === b.value
                ? "bg-gold-soft text-black border-gold-soft font-semibold"
                : "bg-white/5 text-ink-dim hover:bg-white/10"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Upload Box */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="font-display text-sm font-semibold mb-4">Upload Asset to /{activeBucket}</h3>
        <form onSubmit={handleFileUpload} className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="file"
            required
            className="w-full text-xs text-ink-faint file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/5 file:text-ink hover:file:bg-white/10 file:cursor-pointer"
          />
          <button
            type="submit"
            disabled={uploading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gold-soft text-black font-semibold text-xs hover:bg-gold transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {uploading ? "Uploading..." : "Upload Asset"}
          </button>
        </form>
      </div>

      {/* File List Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {files.map((file, idx) => {
          const isImage = ["png", "jpg", "jpeg", "webp", "gif"].some((ext) =>
            file.name.toLowerCase().endsWith(ext)
          );

          return (
            <div
              key={idx}
              className="glass p-3 rounded-xl flex flex-col justify-between aspect-square relative group"
            >
              {/* Media Preview Box */}
              <div className="w-full h-[70%] bg-black/40 rounded-lg overflow-hidden flex items-center justify-center relative">
                {isImage ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-8 h-8 stroke-ink-faint"
                  >
                    <path d="M15 10l5-3v10l-5-3M3 6h11v12H3z" />
                  </svg>
                )}
              </div>

              {/* Title & Actions */}
              <div className="pt-2 flex flex-col gap-1">
                <span className="text-[10px] font-mono text-ink-dim truncate block" title={file.name}>
                  {file.name}
                </span>
                
                <div className="flex gap-2 justify-between mt-1">
                  <button
                    onClick={() => copyUrlToClipboard(file.url)}
                    className="text-[10px] text-gold-soft hover:underline font-semibold"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.name)}
                    className="text-[10px] text-danger hover:underline font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="col-span-full py-12 text-center text-xs text-ink-faint font-mono">
            REFRESHING MEDIA DIRECTORY...
          </div>
        )}

        {!loading && files.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-ink-faint font-mono">
            NO FILES IN THIS BUCKET.
          </div>
        )}
      </div>
    </div>
  );
}
