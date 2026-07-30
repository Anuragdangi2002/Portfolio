"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import { Service } from "@/lib/db";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
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

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-6 h-6 text-gold-soft" strokeWidth={1.6} />;
    }
    return <LucideIcons.Video className="w-6 h-6 text-gold-soft" strokeWidth={1.6} />;
  };

  return (
    <section ref={containerRef} id="services" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Services
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              What I bring
              <br />
              to the timeline.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5] reveal">
            Every engagement is scoped around the outcome — attention, conversion, or emotion — not the software used to get there.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card glass p-9 rounded-lg transition-transform duration-500 hover:-translate-y-2 hover:bg-white/[0.07] reveal select-none"
            >
              {/* Icon Container */}
              <div className="service-icon w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-gold-soft/18 to-cyan/10 flex items-center justify-center mb-6 border border-white/5">
                {renderIcon(service.icon)}
              </div>
              
              {/* Service Details */}
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-ink-dim text-[14.5px] leading-[1.5] mb-5">{service.description}</p>
              
              {/* Service Tags */}
              <div className="service-tag-row flex flex-wrap gap-2">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="tag font-mono text-[10.5px] px-[10px] py-[5px] rounded-[6px] bg-white/[0.05] text-ink-faint border border-white/9"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
