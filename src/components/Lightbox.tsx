"use client";

import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  meta: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageUrl,
  title,
  meta,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[1500] bg-[#050607]/94 backdrop-blur-[20px] flex items-center justify-center transition-opacity duration-400 ease-[cubic-bezier(.16,.8,.24,1)]"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-10 w-[46px] h-[46px] rounded-full border border-white/10 flex items-center justify-center text-ink-dim hover:text-ink hover:border-white/20 transition-all"
        aria-label="Close lightbox"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="lb-inner max-w-[900px] w-[90%] flex flex-col pointer-events-auto">
        <img
          src={imageUrl}
          alt={title}
          className="w-full rounded-2xl max-h-[80vh] object-contain shadow-2xl"
        />
        <div className="lb-meta flex justify-between mt-5 text-ink-dim text-sm flex-wrap gap-2">
          <b className="text-ink font-semibold">{title}</b>
          <span>{meta}</span>
        </div>
      </div>
    </div>
  );
}
