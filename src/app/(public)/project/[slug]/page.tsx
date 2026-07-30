import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";
import { PortfolioSettingsRepository } from "@/lib/repositories/PortfolioSettingsRepository";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/sections/Footer";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  // Fetch details
  const [project, allProjects, settings] = await Promise.all([
    ProjectsRepository.getBySlug(slug),
    ProjectsRepository.getAll(true),
    PortfolioSettingsRepository.get(),
  ]);

  if (!project) {
    notFound();
  }

  // Calculate Next Project for loop navigation
  const currentIdx = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "creator": {
              "@type": "Person",
              "name": settings.name
            }
          })
        }}
      />
      <div className="pt-[140px] relative z-[2] select-none">
      {/* Hero Banner */}
      <div className="wrap">
        <div className="max-w-[980px] mx-auto space-y-6 mb-12">
          <div className="font-mono text-xs text-gold-soft tracking-[0.18em] uppercase flex items-center gap-2.5">
            <span className="w-5 h-[1px] bg-gold-soft" />
            {project.category.toUpperCase()} &middot; {project.year}
          </div>
          <h1 className="font-display text-[clamp(36px,6vw,68px)] font-bold tracking-tight leading-none">
            {project.title}
          </h1>
          <p className="text-ink-dim text-lg leading-[1.5] max-w-[680px]">
            {project.description}
          </p>
        </div>

        {/* Embedded Video Player */}
        <div className="max-w-[980px] mx-auto rounded-2xl overflow-hidden aspect-video bg-panel border border-white/5 shadow-2xl mb-20 relative">
          {project.video_url ? (
            <video
              src={project.video_url}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-ink-faint">
              NO VIDEO ASSET PROVIDED
            </div>
          )}
        </div>

        {/* Details Grid (Overview & Metrics) */}
        <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-12 mb-20 pb-20 border-b border-white/9">
          {/* Main Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.12em] mb-3">Overview</h3>
              <p className="text-ink-dim text-[16px] leading-[1.5]">
                {project.challenge || "Detailed case study coming soon."}
              </p>
            </div>
            
            {project.challenge && (
              <div>
                <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.12em] mb-3">The Challenge</h3>
                <p className="text-ink-dim text-[16px] leading-[1.5]">{project.challenge}</p>
              </div>
            )}
            
            {project.process && (
              <div>
                <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.12em] mb-3">Editing Process</h3>
                <p className="text-ink-dim text-[16px] leading-[1.5]">{project.process}</p>
              </div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6.5 p-7.5 rounded-[18px] bg-panel-2 border border-white/5 h-fit shadow-lg">
            <div className="border-b border-white/5 pb-4">
              <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">Client</span>
              <b className="font-medium text-[15px]">{project.client}</b>
            </div>
            <div className="border-b border-white/5 pb-4">
              <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">Year</span>
              <b className="font-medium text-[15px]">{project.year}</b>
            </div>
            <div className="border-b border-white/5 pb-4">
              <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">Duration</span>
              <b className="font-medium text-[15px]">{project.duration}</b>
            </div>
            <div className="border-b border-white/5 pb-4">
              <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">Software Used</span>
              <b className="font-medium text-[15px]">{project.software_used.join(", ")}</b>
            </div>
            <div>
              <span className="block text-[11px] text-ink-faint uppercase tracking-[0.06em] mb-1">Tags</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.project_tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-[4px] bg-white/5 text-ink-dim border border-white/9"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Before vs After Color Grading comparisons */}
        {project.before_image_url && project.after_image_url && (
          <div className="max-w-[980px] mx-auto mb-20 space-y-8">
            <div className="text-center">
              <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.12em] mb-2">Color Grading</h3>
              <h2 className="font-display text-2xl font-bold tracking-tight">Raw vs Cinematic Grade</h2>
            </div>
            <div className="border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <BeforeAfterSlider
                beforeImage={project.before_image_url}
                afterImage={project.after_image_url}
              />
            </div>
          </div>
        )}

        {/* Results Block */}
        {project.results && (
          <div className="max-w-[980px] mx-auto p-10 bg-panel border border-white/5 rounded-2xl shadow-xl mb-24 select-none">
            <h3 className="font-mono text-xs text-gold-soft uppercase tracking-[0.12em] mb-3">Final Outcomes</h3>
            <p className="font-display text-xl md:text-2xl leading-[1.4] text-ink font-medium">
              &ldquo;{project.results}&rdquo;
            </p>
          </div>
        )}

        {/* Next Project loop navigations */}
        {nextProject && (
          <div className="max-w-[980px] mx-auto border-t border-white/9 pt-16 pb-24 text-center">
            <span className="font-mono text-xs text-ink-faint uppercase tracking-[0.12em] block mb-3">
              Up Next
            </span>
            <Link
              href={`/project/${nextProject.slug}`}
              className="group font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink hover:text-gold-soft transition-colors duration-300 block"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
        )}
      </div>

      <Footer settings={settings} />
    </div>
    </>
  );
}
