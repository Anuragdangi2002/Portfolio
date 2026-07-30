"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/db";

interface FeaturedProjectsProps {
  projects: Project[];
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".reveal"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Alternates layout based on index: odd index (1, 3, etc.) has the media on the right
  const isEven = idx % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`feat-project grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-[60px] items-center mb-[130px] last:mb-0`}
    >
      {/* Media container */}
      <div
        className={`fp-media relative rounded-lg overflow-hidden aspect-[16/10.5] cursor-pointer reveal shadow-2xl ${
          !isEven ? "lg:order-2" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/project/${project.slug}`}>
          {/* Static Image */}
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-[800ms] ease-custom ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />
          {/* Hover Playable Video */}
          {project.video_url && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              src={project.video_url}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {/* Play Button Overlay */}
          <div className="fp-play absolute inset-0 flex items-center justify-center z-[2]">
            <span
              className={`w-16 h-16 rounded-full bg-white/12 backdrop-blur-[10px] border border-white/30 flex items-center justify-center transition-transform duration-400 ease-custom ${
                hovered ? "scale-115" : "scale-100"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-ink ml-[3px]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Copy Details container */}
      <div className="fp-copy reveal">
        <div className="fp-index font-mono text-ink-faint text-[13px] mb-3.5">
          {String(idx + 1).padStart(2, "0")} — {project.project_tags[0]?.toUpperCase() || "PROJECT"}
        </div>
        <h3 className="font-display text-[clamp(28px,3.4vw,42px)] font-bold mb-4 tracking-tight leading-none">
          <Link href={`/project/${project.slug}`} className="hover:text-gold-soft transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-ink-dim text-[15px] max-w-[440px] mb-6 leading-[1.5]">
          {project.description}
        </p>

        {/* Project Meta Metrics */}
        <div className="fp-meta flex gap-7 mb-6 flex-wrap">
          <div>
            <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">
              Client
            </span>
            <b className="font-medium text-sm">{project.client}</b>
          </div>
          <div>
            <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">
              Duration
            </span>
            <b className="font-medium text-sm">{project.duration}</b>
          </div>
          <div>
            <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">
              Tools
            </span>
            <b className="font-medium text-sm">{project.software_used.join(", ")}</b>
          </div>
        </div>

        {/* Link Button */}
        <Link
          href={`/project/${project.slug}`}
          className="fp-link inline-flex items-center gap-2.5 text-sm text-gold-soft border-b border-gold-soft/40 pb-1 hover:border-gold-soft transition-colors"
        >
          View case study
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter featured projects
  const featured = projects.filter((p) => p.featured);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = containerRef.current?.querySelectorAll(".sec-reveal");
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
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] sec-reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Featured work
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] sec-reveal">
              Case-led
              <br />
              selections.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5] sec-reveal">
            A handful of projects where the edit was the difference between good footage and a great result.
          </p>
        </div>

        {/* Featured Projects Stack */}
        <div className="flex flex-col">
          {featured.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
