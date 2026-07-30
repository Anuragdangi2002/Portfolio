"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reel } from "@/lib/db";

interface ReelsShowcaseProps {
  reels: Reel[];
}

export default function ReelsShowcase({ reels }: ReelsShowcaseProps) {
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

  return (
    <section ref={containerRef} id="reels" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Reels showcase
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] reveal">
              Vertical-first
              <br />
              storytelling.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5] reveal">
            Short-form cuts built for the scroll — hooks in the first frame, payoff before the swipe.
          </p>
        </div>

        {/* Reels Strip */}
        <div className="reels-strip flex gap-6 overflow-x-auto pb-10 scrollbar-thin select-none">
          {reels.map((reel, idx) => (
            <div
              key={reel.id}
              className={`phone reveal w-[230px] flex-shrink-0 rounded-[34px] border-6 border-[#1a1b1f] bg-black aspect-[9/19.5] relative overflow-hidden shadow-2xl transition-transform duration-500 ease-custom hover:scale-[1.03] ${
                idx === 1 ? "translate-y-[-24px] hover:translate-y-[-34px]" : "hover:translate-y-[-10px]"
              }`}
            >
              {/* Notch */}
              <div className="notch absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-b-xl z-[2]" />
              
              {/* Video/Image Background */}
              <img
                src={reel.thumbnail_url}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              
              {/* Autoplaying muted loop video preview inside phone */}
              {reel.video_url && (
                <video
                  muted
                  loop
                  playsInline
                  autoPlay
                  src={reel.video_url}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}

              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-[1]" />
              <div className="reel-meta absolute bottom-3.5 left-3.5 right-3.5 z-[2] text-[11px] text-white">
                <b className="block text-[12px] font-semibold tracking-tight">{reel.title}</b>
                {reel.views_count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
