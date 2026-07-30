"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = containerRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
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

  const beforeImage = "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1400&auto=format&fit=crop";
  // The after image has sepia/saturation grading applied
  const afterImage = "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1400&auto=format&fit=crop";

  return (
    <section ref={containerRef} id="beforeafter" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex flex-col items-center justify-center text-center mb-16">
          <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
            <span className="w-[22px] h-[1px] bg-gold-soft" />
            Colour & grade
          </div>
          <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
            Raw footage,
            <br />
            reimagined.
          </h2>
        </div>

        {/* Comparison Slider component wrapper */}
        <div className="reveal">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl max-w-[980px] mx-auto border border-white/5">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
