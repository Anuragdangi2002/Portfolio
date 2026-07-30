import { MetadataRoute } from "next";
import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kairhodes.film";

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];

  try {
    const projects = await ProjectsRepository.getAll(true);
    const projectUrls = projects.map((p) => ({
      url: `${baseUrl}/project/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return [...staticUrls, ...projectUrls];
  } catch (e) {
    return staticUrls;
  }
}
