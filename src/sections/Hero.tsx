"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioSettings } from "@/lib/db";

interface HeroProps {
  settings: PortfolioSettings;
}

export default function Hero({ settings }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hudRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<Array<SVGSVGElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial entry animations
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Split lines translate up
    titleLineRefs.current.forEach((lineSpan) => {
      if (lineSpan) {
        tl.to(lineSpan, {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
        }, "-=0.9");
      }
    });

    // 2. HUD fade-in
    if (hudRef.current) {
      tl.fromTo(
        hudRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }

    // 3. Subtitle & CTAs slide up
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    }

    // 4. Float objects fade in and animate up
    floatRefs.current.forEach((floatObj, idx) => {
      if (floatObj) {
        tl.fromTo(
          floatObj,
          { opacity: 0, y: 40 },
          { opacity: idx === 0 ? 0.8 : idx === 1 ? 0.7 : 0.6, y: 0, duration: 1.4, ease: "power3.out" },
          "-=1.1"
        );

        // Parallax drift on scroll
        gsap.to(floatObj, {
          y: idx % 2 === 0 ? -120 : 80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Mouse parallax tracking on float objects
    const handleMouseMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;

      floatRefs.current.forEach((floatObj, idx) => {
        if (floatObj) {
          const factor = idx === 0 ? 30 : idx === 1 ? -24 : 18;
          gsap.to(floatObj, {
            x: cx * factor,
            y: cy * Math.abs(factor),
            duration: 0.8,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden pb-[70px] pt-[150px] z-[2]"
    >
      {/* Background Video / Cover */}
      <div className="hero-bg absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={settings.profile_image_url}
          className="w-full h-full object-cover opacity-[0.35] filter saturate-[1.05] contrast-[1.05]"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-computer-9665/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="fade absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black" />
      </div>

      {/* conic glow animation light rays */}
      <div className="hero-rays absolute inset-[-20%] z-[1] pointer-events-none bg-[conic-gradient(from_200deg_at_30%_10%,rgba(240,201,134,0.16),transparent_25%,transparent_75%,rgba(87,199,212,0.12))] blur-[40px] animate-rays" />

      {/* Floating Camera Objects (SVG Vectors) */}
      <svg
        ref={(el) => { floatRefs.current[0] = el; }}
        className="float-obj f1 absolute top-[16%] right-[8%] w-[120px] z-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none opacity-0"
        viewBox="0 0 100 100"
      >
        <g fill="none" stroke="#f0c986" strokeWidth="1.4">
          <rect x="18" y="30" width="64" height="42" rx="6" />
          <circle cx="50" cy="51" r="14" />
          <circle cx="50" cy="51" r="6" />
          <rect x="66" y="22" width="16" height="12" rx="2" />
        </g>
      </svg>
      
      <svg
        ref={(el) => { floatRefs.current[1] = el; }}
        className="float-obj f2 absolute top-[38%] left-[4%] w-[90px] z-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none opacity-0"
        viewBox="0 0 100 100"
      >
        <g fill="none" stroke="#57c7d4" strokeWidth="1.4">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="8" fill="#57c7d4" />
          <circle cx="50" cy="14" r="4" />
          <circle cx="50" cy="86" r="4" />
          <circle cx="14" cy="50" r="4" />
          <circle cx="86" cy="50" r="4" />
        </g>
      </svg>

      <svg
        ref={(el) => { floatRefs.current[2] = el; }}
        className="float-obj f3 absolute bottom-[22%] right-[20%] w-[70px] z-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none opacity-0"
        viewBox="0 0 100 100"
      >
        <g fill="none" stroke="#f0c986" strokeWidth="2">
          <circle cx="50" cy="50" r="34" />
          <path d="M42 36 L68 50 L42 64 Z" fill="#f0c986" stroke="none" />
        </g>
      </svg>

      {/* Main Hero HUD & Content */}
      <div className="wrap w-full flex flex-col h-full relative z-[2]">
        <div ref={hudRef} className="hero-hud flex justify-between items-start font-mono text-[12px] text-ink-dim mb-auto pt-1.5 opacity-0">
          <div className="rec flex items-center gap-2">
            <span className="dot w-2 h-2 rounded-full bg-danger animate-blink" />
            REC · 4K CINEMA
          </div>
          <div>SHOWREEL / 2026</div>
        </div>

        <div className="hero-content mt-12">
          <h1 className="hero-title font-display font-extrabold text-[clamp(44px,8vw,120px)] leading-[1.02] tracking-tighter overflow-hidden">
            <span className="line block overflow-hidden">
              <span ref={(el) => { titleLineRefs.current[0] = el; }} className="inline-block translate-y-[110%]">
                FRAME BY
              </span>
            </span>
            <span className="line block overflow-hidden">
              <span ref={(el) => { titleLineRefs.current[1] = el; }} className="inline-block translate-y-[110%] grad-text">
                FRAME, STORY
              </span>
            </span>
            <span className="line block overflow-hidden">
              <span ref={(el) => { titleLineRefs.current[2] = el; }} className="inline-block translate-y-[110%]">
                BY DESIGN.
              </span>
            </span>
          </h1>

          <div ref={subRef} className="hero-sub flex justify-between items-end gap-10 mt-[34px] flex-wrap opacity-0">
            <p className="max-w-[420px] text-ink-dim text-[16px] leading-[1.5]">{settings.subtitle}</p>
            
            <div className="hero-badges flex gap-3.5 flex-wrap">
              <div className="hero-badge glass flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-mono text-ink-dim">
                <span className="pulse w-1.5 h-1.5 rounded-full bg-gold-soft shadow-[0_0_8px_#f0c986]" />
                {settings.availability}
              </div>
              <a
                href="#projects"
                className="btn-glow relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-gold-soft to-gold text-[#0c0a06] font-semibold text-sm shadow-[0_0_0_0_rgba(240,201,134,0.5)] hover:shadow-[0_0_40px_4px_rgba(240,201,134,0.45)] transition-all duration-400 ease-custom select-none"
              >
                Watch showreel
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-cue absolute bottom-[52px] left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
        <span>Scroll</span>
        <div className="line w-[1px] h-10 bg-gradient-to-b from-gold-soft to-transparent relative overflow-hidden">
          <div className="after absolute top-[-100%] left-0 w-full h-full bg-gold-soft animate-cue" />
        </div>
      </div>
    </section>
  );
}
