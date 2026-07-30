"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices
    if (window.innerWidth <= 900) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);
      
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = () => setGrow(true);
    const handleMouseLeave = () => setGrow(false);

    window.addEventListener("mousemove", handleMouseMove);
    const ringLoop = requestAnimationFrame(animateRing);

    // Setup hover listeners for interactive elements
    const attachListeners = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, .mason-item, .fp-media, input, textarea, .faq-q, [data-interactive]"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Run initially
    attachListeners();

    // Create an observer to attach listeners to dynamically loaded content (e.g. masonry filter changes)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(ringLoop);
      observer.disconnect();
      const interactiveEls = document.querySelectorAll(
        "a, button, .mason-item, .fp-media, input, textarea, .faq-q, [data-interactive]"
      );
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor"
        style={{ opacity: grow ? 0.3 : 1 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${grow ? "grow" : ""}`}
      >
        <span>View</span>
      </div>
    </>
  );
}
