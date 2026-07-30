"use server";

import { revalidatePath } from "next/cache";
import { Project } from "@/lib/db";
import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";

export async function saveProjectAction(project: Project) {
  try {
    const saved = await ProjectsRepository.save(project);
    revalidatePath("/");
    revalidatePath(`/project/${project.slug}`);
    return { success: true, project: saved };
  } catch (error) {
    console.error("Failed to save project server-side", error);
    return { success: false, error: "Database save failed" };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const success = await ProjectsRepository.delete(id);
    revalidatePath("/");
    return { success };
  } catch (error) {
    console.error("Failed to delete project server-side", error);
    return { success: false, error: "Database delete failed" };
  }
}
