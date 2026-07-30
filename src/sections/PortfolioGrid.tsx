"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/lib/db";
import Lightbox from "@/components/Lightbox";

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({
    imageUrl: "",
    title: "",
    meta: "",
  });

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

  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCardClick = (project: Project) => {
    setLightboxData({
      imageUrl: project.cover_url || project.thumbnail_url,
      title: project.title,
      meta: `${project.category.toUpperCase()} · ${project.year} · ${project.client}`,
    });
    setLightboxOpen(true);
  };

  // Filter projects by active filter category AND search query
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "all" || project.category === activeFilter;
      
    const matchesSearch =
      searchQuery.trim() === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.project_tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  const filterCategories = [
    { value: "all", label: "All" },
    { value: "reels", label: "Reels" },
    { value: "commercials", label: "Commercials" },
    { value: "shorts", label: "Shorts" },
    { value: "youtube", label: "YouTube" },
    { value: "weddings", label: "Weddings" },
    { value: "motion", label: "Motion Graphics" },
    { value: "ads", label: "Ads" },
  ];

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="py-[150px] md:py-[150px] py-[100px] relative z-[2]"
    >
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-12 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px] sec-reveal">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Full portfolio
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02] sec-reveal">
              Every cut,
              <br />
              catalogued.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5] sec-reveal">
            Filter by category or search by client, tag, or format — the archive updates instantly.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="portfolio-controls flex justify-between gap-6 items-center mb-11 flex-wrap sec-reveal">
          <div className="filter-row flex gap-2 flex-wrap">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleFilterClick(cat.value)}
                className={`filter-btn px-4.5 py-2.5 rounded-full text-[13px] border border-white/9 bg-white/5 text-ink-dim transition-all duration-300 ${
                  activeFilter === cat.value
                    ? "!bg-gold-soft !text-black !border-gold-soft"
                    : "hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-box flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-white/9 bg-white/5 min-w-[220px] focus-within:border-gold-soft transition-all duration-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 stroke-ink-faint flex-shrink-0"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
            <input
              type="text"
              placeholder="Search projects, tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent border-none outline-none text-[13px] text-ink w-full placeholder-ink-faint"
            />
          </div>
        </div>

        {/* Masonry Portfolio Grid */}
        <div
          className="masonry gap-5 select-none"
          style={{
            columnCount: filteredProjects.length > 0 ? undefined : 1,
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="mason-item break-inside-avoid mb-5 rounded-lg overflow-hidden relative cursor-pointer group transition-all duration-500 scale-100 opacity-100"
            >
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full object-cover group-hover:scale-105 filter group-hover:brightness-105 transition-transform duration-700 ease-custom"
                style={{ height: `${project.slug.length % 2 === 0 ? "340px" : "400px"}` }}
                loading="lazy"
              />
              <div className="mason-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mtag font-mono text-[10px] text-gold-soft uppercase tracking-[0.08em] mb-1.5">
                  {project.category}
                </span>
                <h4 className="text-base font-semibold leading-tight">{project.title}</h4>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-ink-faint font-mono text-sm">
              NO PROJECTS FOUND MATCHING FILTERS.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Trigger */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        meta={lightboxData.meta}
      />
    </section>
  );
}
