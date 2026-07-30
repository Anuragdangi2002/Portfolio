"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "@/lib/db";

interface AwardsProps {
  awards: Award[];
}

export default function Awards({ awards }: AwardsProps) {
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

  const achievements = [
    {
      title: "Adobe Certified Expert",
      desc: "Premiere Pro & After Effects",
    },
    {
      title: "DaVinci Resolve Certified",
      desc: "Colourist, Level 2",
    },
    {
      title: "Avid Editing Certificate",
      desc: "Media Composer",
    },
    {
      title: "Dolby Atmos Mixing",
      desc: "Post-Production Sound",
    },
  ];

  return (
    <section ref={containerRef} id="awards" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap space-y-24">
        {/* Achievements Grid */}
        <div className="space-y-16">
          <div className="sec-head">
            <div>
              <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
                <span className="w-[22px] h-[1px] bg-gold-soft" />
                Certifications
              </div>
              <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
                Credentials
                <br />
                & training.
              </h2>
            </div>
          </div>
          
          <div className="achieve-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="achieve-card glass p-[30px_24px] rounded-lg text-left reveal select-none"
              >
                <svg
                  className="a-icon w-9.5 h-9.5 mb-5 stroke-gold-soft fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8 13l-2 8 6-3 6 3-2-8" />
                </svg>
                <h4 className="text-base font-semibold mb-2">{ach.title}</h4>
                <p className="text-xs text-ink-faint">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards list */}
        <div className="space-y-16">
          <div className="sec-head">
            <div>
              <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
                <span className="w-[22px] h-[1px] bg-gold-soft" />
                Recognition
              </div>
              <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
                Awards &
                <br />
                featured work.
              </h2>
            </div>
          </div>

          <div className="awards-list flex flex-col select-none">
            {awards.map((award) => (
              <div
                key={award.id}
                className="award-row flex justify-between items-center py-6.5 px-1 border-b border-white/9 transition-all duration-350 ease-custom hover:pl-4 reveal"
              >
                <span className="aw-name font-display text-[20px] font-semibold">
                  {award.title} {award.subtitle ? `— ${award.subtitle}` : ""}
                </span>
                <span className="aw-meta flex gap-[30px] items-center font-mono text-xs text-ink-faint">
                  <span>{award.year}</span>
                  <span className="award-badge py-1.5 px-3 rounded-full text-[11px] bg-gold-soft/12 text-gold-soft border border-gold-soft/30">
                    {award.badge_text}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
