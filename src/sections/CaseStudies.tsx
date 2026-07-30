"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/db";

interface CaseStudiesProps {
  projects: Project[];
}

export default function CaseStudies({ projects }: CaseStudiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter projects that have full case study data
  const caseStudies = projects.filter(
    (p) => p.challenge && p.process && p.results
  );

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

  return (
    <section
      ref={containerRef}
      id="casestudies"
      className="py-[150px] md:py-[150px] py-[100px] relative z-[2]"
    >
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Process
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              Challenge, process,
              <br />
              result.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5] reveal">
            A closer look at how projects moved from brief to final master.
          </p>
        </div>

        {/* Case Studies list */}
        <div className="space-y-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="space-y-6">
              <div className="case-head-row flex justify-between items-center border-b border-white/9 pb-4.5 flex-wrap gap-3.5 reveal">
                <h3 className="font-display text-2xl font-semibold">{study.title}</h3>
                <span className="tag font-mono text-[10.5px] px-[10px] py-[5px] rounded-[6px] bg-white/[0.05] text-ink-faint border border-white/9">
                  {study.project_tags[0] || "Case Study"}
                </span>
              </div>
              
              <div className="case-study grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/9 rounded-2xl overflow-hidden reveal shadow-xl">
                {/* Challenge */}
                <div className="case-col bg-panel p-10 select-none">
                  <div className="cs-label font-mono text-[11px] uppercase tracking-[0.12em] text-gold-soft mb-4">
                    Challenge
                  </div>
                  <p className="text-ink-dim text-[14.5px] leading-[1.5]">
                    {study.challenge}
                  </p>
                </div>
                {/* Process */}
                <div className="case-col bg-panel p-10 select-none">
                  <div className="cs-label font-mono text-[11px] uppercase tracking-[0.12em] text-gold-soft mb-4">
                    Process
                  </div>
                  <p className="text-ink-dim text-[14.5px] leading-[1.5]">
                    {study.process}
                  </p>
                </div>
                {/* Result */}
                <div className="case-col bg-panel p-10 select-none">
                  <div className="cs-label font-mono text-[11px] uppercase tracking-[0.12em] text-gold-soft mb-4">
                    Result
                  </div>
                  <p className="text-ink-dim text-[14.5px] leading-[1.5]">
                    {study.results}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
