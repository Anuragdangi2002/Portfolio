"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioSettings } from "@/lib/db";

interface AboutProps {
  settings: PortfolioSettings;
}

function CounterItem({ targetVal, label }: { targetVal: number; label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = elementRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        let cur = 0;
        const duration = 1500; // ms
        const steps = 60;
        const stepTime = duration / steps;
        const increment = targetVal / steps;

        const timer = setInterval(() => {
          cur += increment;
          if (cur >= targetVal) {
            setCount(targetVal);
            clearInterval(timer);
          } else {
            setCount(Math.floor(cur));
          }
        }, stepTime);
      },
    });
  }, [targetVal]);

  return (
    <div ref={elementRef} className="stat-item py-[22px] border-t border-white/9 reveal">
      <div className="stat-num font-display text-[38px] font-bold text-gold-soft leading-none">
        {count.toLocaleString()}
      </div>
      <div className="stat-label text-[12px] text-ink-faint uppercase tracking-[0.08em] mt-1.5">
        {label}
      </div>
    </div>
  );
}

export default function About({ settings }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
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
    <section ref={sectionRef} id="about" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        <div className="about-grid grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-[80px] items-center">
          {/* Portrait Image */}
          <div className="portrait relative rounded-lg overflow-hidden aspect-[4/5] reveal shadow-2xl">
            <img
              src={settings.profile_image_url}
              alt="Portrait of Kai Rhodes at the editing desk"
              className="w-full h-full object-cover filter grayscale-[30%] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/25 to-transparent pointer-events-none" />
            <div className="frame-tag absolute bottom-5 left-5 font-mono text-[11px] text-ink bg-black/40 px-3 py-2 rounded-lg backdrop-blur-[10px]">
              CAM_02 · 24fps · ISO 400
            </div>
          </div>

          {/* Description Copy */}
          <div className="about-copy">
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              About
            </div>
            <p className="lede font-display text-[24px] md:text-[26px] font-medium leading-[1.35] text-ink mb-7 reveal">
              Twelve years cutting stories that hold attention hostage — from 30‑second ads to feature documentaries, always chasing the frame that makes people feel something before they know why.
            </p>
            <div className="space-y-6 text-ink-dim text-[16px] md:text-[17px] leading-[1.5] reveal">
              {settings.biography.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Counter Stats */}
            <div className="stat-row grid grid-cols-2 sm:grid-cols-4 gap-5 mt-[50px]">
              {settings.stats.map((stat, idx) => (
                <CounterItem
                  key={idx}
                  targetVal={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
