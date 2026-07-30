"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";

export default function Tools() {
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

  const tools = [
    { name: "Premiere Pro", icon: "Monitor" },
    { name: "After Effects", icon: "Layers" },
    { name: "DaVinci Resolve", icon: "Sliders" },
    { name: "Photoshop", icon: "Image" },
    { name: "Blender", icon: "Box" },
    { name: "Pro Tools", icon: "Music" },
  ];

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="tool-ic w-[34px] h-[34px] stroke-gold-soft fill-none" strokeWidth={1.6} />;
    }
    return <LucideIcons.Video className="tool-ic w-[34px] h-[34px] stroke-gold-soft fill-none" strokeWidth={1.6} />;
  };

  return (
    <section ref={containerRef} id="tools" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Tools & software
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              The editing
              <br />
              bay.
            </h2>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="tools-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="tool-card glass aspect-square rounded-[18px] flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-custom hover:-translate-y-1.5 hover:bg-white/[0.07] reveal select-none"
            >
              {renderIcon(tool.icon)}
              <span className="text-[11.5px] text-ink-dim text-center">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
