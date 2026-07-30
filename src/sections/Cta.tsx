"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = containerRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} id="cta" className="text-center py-[180px] relative z-[2]">
      <div className="wrap max-w-xl mx-auto flex flex-col items-center">
        <div className="eyebrow flex items-center justify-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
          Ready when you are
        </div>
        
        <h2 className="h-display font-display text-[clamp(40px,7vw,84px)] font-bold tracking-tight leading-none mb-[34px] reveal grad-text">
          Let&apos;s make your
          <br />
          footage unforgettable.
        </h2>
        
        <p className="reveal text-ink-dim text-[16px] max-w-[460px] mb-11 leading-[1.5]">
          A limited number of project slots open each quarter — reach out early to lock in your timeline.
        </p>
        
        <a
          href="#contact"
          className="btn-glow relative inline-flex items-center gap-2.5 px-11 py-5 rounded-full bg-gradient-to-r from-gold-soft to-gold text-[#0c0a06] font-semibold text-[15px] shadow-[0_0_0_0_rgba(240,201,134,0.5)] hover:shadow-[0_0_40px_4px_rgba(240,201,134,0.45)] transition-all duration-400 ease-custom select-none cursor-none reveal"
        >
          Start your project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="w-4 h-4">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
