"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioSettings } from "@/lib/db";

interface StatsProps {
  settings: PortfolioSettings;
}

function StatBlock({ targetVal, label }: { targetVal: number; label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = elementRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        let cur = 0;
        const duration = 1200; // ms
        const steps = 50;
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
    <div ref={elementRef} className="stat-block bg-panel p-[46px_30px] text-center reveal select-none">
      <div className="stat-num font-display text-[52px] font-bold text-gold-soft leading-none">
        {count.toLocaleString()}{label.includes("%") ? "" : ""}
      </div>
      <div className="stat-label text-[12px] text-ink-faint uppercase tracking-[0.08em] mt-2.5">
        {label}
      </div>
    </div>
  );
}

export default function Stats({ settings }: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = containerRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  // Use general site statistics
  const statBlocks = [
    { label: "Projects delivered", value: 240 },
    { label: "Client retention %", value: 94 },
    { label: "Hours of footage cut", value: 2400 },
    { label: "Industry awards", value: 14 },
  ];

  return (
    <section ref={containerRef} id="stats" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        <div className="stats-band grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/9 rounded-2xl overflow-hidden shadow-xl">
          {statBlocks.map((stat, idx) => (
            <StatBlock
              key={idx}
              targetVal={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
