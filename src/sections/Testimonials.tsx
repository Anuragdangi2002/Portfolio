"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Testimonial, ClientLogo } from "@/lib/db";

interface TestimonialsProps {
  testimonials: Testimonial[];
  clients: ClientLogo[];
}

export default function Testimonials({ testimonials, clients }: TestimonialsProps) {
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

  // Split testimonials for alternating rows
  const halfLength = Math.ceil(testimonials.length / 2);
  const row1Testimonials = testimonials.slice(0, halfLength);
  const row2Testimonials = testimonials.slice(halfLength);

  // Duplicate items for infinite marquee illusion
  const row1Items = [...row1Testimonials, ...row1Testimonials];
  const row2Items = [...row2Testimonials, ...row2Testimonials];
  const clientItems = [...clients, ...clients];

  return (
    <section ref={containerRef} id="testimonials" className="py-[150px] md:py-[150px] py-[100px] relative z-[2] overflow-hidden">
      {/* Testimonials Title */}
      <div className="wrap">
        <div className="sec-head mb-16">
          <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
            <span className="w-[22px] h-[1px] bg-gold-soft" />
            Testimonials
          </div>
          <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
            Kind words,
            <br />
            on record.
          </h2>
        </div>
      </div>

      {/* Marquee Row 1 (Moving Left) */}
      <div className="marquee-row reveal select-none">
        <div className="marquee-track animate-scroll-left hover:[animation-play-state:paused]">
          {row1Items.map((t, idx) => (
            <div key={idx} className="t-card glass w-[360px] flex-shrink-0 p-7 rounded-[18px]">
              <div className="t-stars text-gold-soft text-xs tracking-[2px] mb-3.5">
                {"★".repeat(t.rating)}
              </div>
              <p className="quote text-ink-dim text-[14.5px] leading-[1.5] mb-5.5 min-h-[80px]">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="t-person flex items-center gap-3">
                <img
                  src={t.client_photo_url}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <b className="text-[13.5px] block font-semibold leading-tight">{t.name}</b>
                  <span className="text-[12px] text-ink-faint">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Moving Right - Reverse) */}
      <div className="marquee-row rev reveal select-none">
        <div className="marquee-track animate-scroll-right hover:[animation-play-state:paused]">
          {row2Items.map((t, idx) => (
            <div key={idx} className="t-card glass w-[360px] flex-shrink-0 p-7 rounded-[18px]">
              <div className="t-stars text-gold-soft text-xs tracking-[2px] mb-3.5">
                {"★".repeat(t.rating)}
              </div>
              <p className="quote text-ink-dim text-[14.5px] leading-[1.5] mb-5.5 min-h-[80px]">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="t-person flex items-center gap-3">
                <img
                  src={t.client_photo_url}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <b className="text-[13.5px] block font-semibold leading-tight">{t.name}</b>
                  <span className="text-[12px] text-ink-faint">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Logo Wall Banner */}
      <div id="clients" className="pt-24 select-none">
        <div className="wrap">
          <div className="eyebrow flex items-center justify-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-6 reveal">
            Trusted by
          </div>
        </div>
        <div className="marquee-row reveal">
          <div
            className="marquee-track animate-scroll-left hover:[animation-play-state:paused]"
            style={{ animationDuration: "26s" }}
          >
            {clientItems.map((c, idx) => (
              <div
                key={idx}
                className="logo-item flex-shrink-0 w-[180px] h-[90px] flex items-center justify-center font-display font-bold text-xl text-ink-faint opacity-60 hover:opacity-100 hover:text-ink transition-all border-r border-white/9"
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
