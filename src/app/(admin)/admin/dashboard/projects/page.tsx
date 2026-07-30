import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";
import ProjectsManagerClient from "./ProjectsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await ProjectsRepository.getAll();

  return <ProjectsManagerClient initialProjects={projects} />;
}
