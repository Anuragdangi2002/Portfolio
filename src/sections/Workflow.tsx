"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Workflow() {
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

  const steps = [
    {
      tc: "00:00:00 — 00:04:00",
      title: "Ingest & Organise",
      desc: "Footage logged, proxies generated, bins structured by scene and camera so nothing gets lost across terabytes of raw media.",
    },
    {
      tc: "00:04:00 — 00:12:00",
      title: "Assembly Cut",
      desc: "A rough structure built fast — the story's spine, in order, before any polish, so the shape can be judged honestly.",
    },
    {
      tc: "00:12:00 — 00:18:00",
      title: "Fine Cut & Sound",
      desc: "Pacing tightened, transitions refined, sound design and music layered in to give the edit its emotional weight.",
    },
    {
      tc: "00:18:00 — 00:22:00",
      title: "Grade & Finish",
      desc: "Colour graded per shot, titles and motion graphics added, mix finalised for the delivery format.",
    },
    {
      tc: "00:22:00 — 00:24:56",
      title: "Review & Master",
      desc: "Client review rounds, revisions, and a final master exported to spec — ready for broadcast, web, or the big screen.",
    },
  ];

  return (
    <section ref={containerRef} id="workflow" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap max-w-[900px]">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Workflow
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              From ingest
              <br />
              to master.
            </h2>
          </div>
        </div>

        {/* Workflow Timeline */}
        <div className="wf-timeline relative pl-9 select-none">
          {steps.map((step, idx) => (
            <div key={idx} className="wf-step relative pb-14 last:pb-0 reveal">
              <div className="wf-tc font-mono text-xs text-ink-faint mb-2">
                {step.tc}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-ink-dim text-[14.5px] leading-[1.5] max-w-[520px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
