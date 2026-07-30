import { PortfolioSettingsRepository } from "@/lib/repositories/PortfolioSettingsRepository";
import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";
import { ReelsRepository } from "@/lib/repositories/ReelsRepository";
import { ServicesRepository } from "@/lib/repositories/ServicesRepository";
import { TestimonialsRepository } from "@/lib/repositories/TestimonialsRepository";
import { ClientsRepository } from "@/lib/repositories/ClientsRepository";
import { AwardsRepository } from "@/lib/repositories/AwardsRepository";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import FeaturedProjects from "@/sections/FeaturedProjects";
import PortfolioGrid from "@/sections/PortfolioGrid";
import ReelsShowcase from "@/sections/ReelsShowcase";
import BeforeAfter from "@/sections/BeforeAfter";
import CaseStudies from "@/sections/CaseStudies";
import Workflow from "@/sections/Workflow";
import Tools from "@/sections/Tools";
import Awards from "@/sections/Awards";
import Stats from "@/sections/Stats";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Cta from "@/sections/Cta";
import Footer from "@/sections/Footer";

export const dynamic = "force-dynamic";

export default async function PublicHomePage() {
  // Fetch all contents in parallel from database repositories
  const [
    settings,
    projects,
    reels,
    services,
    testimonials,
    clients,
    awards,
  ] = await Promise.all([
    PortfolioSettingsRepository.get(),
    ProjectsRepository.getAll(true),
    ReelsRepository.getAll(),
    ServicesRepository.getAll(true),
    TestimonialsRepository.getAll(true),
    ClientsRepository.getAll(true),
    AwardsRepository.getAll(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": settings.name,
            "jobTitle": "Film & Motion Editor",
            "url": "https://kairhodes.film",
            "biography": settings.biography,
            "sameAs": [
              settings.socials.instagram,
              settings.socials.youtube,
              settings.socials.linkedin
            ]
          })
        }}
      />
      <Hero settings={settings} />
      <About settings={settings} />
      <Services services={services} />
      <FeaturedProjects projects={projects} />
      <PortfolioGrid projects={projects} />
      <ReelsShowcase reels={reels} />
      <BeforeAfter />
      <CaseStudies projects={projects} />
      <Testimonials testimonials={testimonials} clients={clients} />
      <Workflow />
      <Tools />
      <Awards awards={awards} />
      <Stats settings={settings} />
      <Cta />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </>
  );
}
