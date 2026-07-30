"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only initialize on desktop/mouse devices to save mobile battery
    const isMobile = window.innerWidth <= 900;
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isMobile,
      wheelMultiplier: 1.1,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll updates with ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Add Lenis update hook to GSAP ticker
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial trigger refresh
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
