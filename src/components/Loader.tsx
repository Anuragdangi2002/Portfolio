"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onLoaded: () => void;
}

export default function Loader({ onLoaded }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFilling, setIsFilling] = useState(false);

  useEffect(() => {
    // Start loader filling animations
    setIsFilling(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onLoaded, 900); // Wait for transition out animation to complete
          }, 350);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isDone) return null;

  return (
    <div
      id="loader"
      className={`${isFilling ? "fill" : ""} ${isDone ? "done" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#08090b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "26px",
        transition: "opacity 0.9s cubic-bezier(.16,.8,.24,1), visibility 0.9s",
        opacity: isDone ? 0 : 1,
        visibility: isDone ? "hidden" : "visible",
      }}
    >
      <div
        className="loader-mark"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15vw",
          fontWeight: 800,
          letterSpacing: "-.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(243, 239, 230, 0.5)",
          position: "relative",
          lineHeight: 1,
        }}
      >
        KR
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: "#f0c986",
            WebkitTextStroke: 0,
            clipPath: `inset(${100 - progress}% 0 0 0)`,
            transition: "clip-path 0.4s ease",
          }}
        >
          KR
        </div>
      </div>
      <div className="loader-bar" style={{ width: "220px", height: "1px", background: "rgba(255,255,255,.12)", position: "relative", overflow: "hidden" }}>
        <span
          id="loaderFill"
          style={{
            position: "absolute",
            inset: 0,
            width: `${progress}%`,
            background: "#f0c986",
            transition: "width 0.2s linear",
          }}
        />
      </div>
      <div className="loader-pct" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: ".2em", color: "#64656c" }}>
        LOADING REEL — {Math.floor(progress)}%
      </div>
    </div>
  );
}
