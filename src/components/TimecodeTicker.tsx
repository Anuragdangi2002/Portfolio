"use client";

import { useEffect, useState } from "react";

export default function TimecodeTicker() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [timecodeStr, setTimecodeStr] = useState("00:00:00:00");

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const totalScroll = h.scrollHeight - h.clientHeight;
      if (totalScroll <= 0) return;

      const p = (h.scrollTop / totalScroll) * 100;
      setScrollPercent(Math.min(100, Math.max(0, p)));

      // Calculate cinematic timecode (mapping scroll position 0-100% to 00:00:00:00 - 00:24:56:12)
      // Max total seconds = 24 * 60 + 56 = 1496 seconds. Max frame = 12.
      // Total frames @ 24fps = 1496 * 24 + 12 = 35916 frames
      const totalFrames = Math.floor((p / 100) * 35916);
      
      const frameRate = 24;
      const frame = totalFrames % frameRate;
      const totalSeconds = Math.floor(totalFrames / frameRate);
      const second = totalSeconds % 60;
      const minute = Math.floor(totalSeconds / 60) % 60;
      const hour = Math.floor(totalSeconds / 3600);

      const hh = String(hour).padStart(2, "0");
      const mm = String(minute).padStart(2, "0");
      const ss = String(second).padStart(2, "0");
      const ff = String(frame).padStart(2, "0");

      setTimecodeStr(`${hh}:${mm}:${ss}:${ff}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="timecode"
      className="fixed left-0 right-0 bottom-0 z-[400] h-[34px] flex items-center justify-between px-[18px] font-mono text-[11px] text-ink-faint bg-gradient-to-t from-black/70 to-transparent pointer-events-none select-none"
    >
      <span>{timecodeStr}</span>
      <div className="tc-track relative flex-1 h-[1px] bg-white/12 mx-[14px]">
        <div
          className="tc-fill absolute left-0 top-0 h-full bg-gold-soft"
          style={{ width: `${scrollPercent}%` }}
        />
        <div
          className="tc-head absolute top-1/2 w-2 h-2 rounded-full bg-gold-soft -translate-y-1/2 shadow-[0_0_12px_#f0c986]"
          style={{ left: `${scrollPercent}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
      <span>00:24:56:12</span>
    </div>
  );
}
