"use client";

import { useEffect, useState } from "react";

export default function Fab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 900);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-7 bottom-14 z-[300] w-14 h-14 rounded-full bg-gold-soft text-[#0c0a06] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-400 ease-[cubic-bezier(.16,.8,.24,1)] ${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        className="w-[18px] h-[18px]"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
