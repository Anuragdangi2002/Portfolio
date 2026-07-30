import { createClient } from "@/utils/supabase/server";
import { Project } from "@/lib/db";

export const ProjectsRepository = {
  async getAll(publishedOnly = false): Promise<Project[]> {
    const supabase = await createClient();
    let query = supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (publishedOnly) {
      query = query.eq("status", "published").eq("archived", false);
    } else {
      query = query.eq("archived", false);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching projects from Supabase", error);
      return [];
    }
    return (data || []) as unknown as Project[];
  },

  async getBySlug(slug: string): Promise<Project | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("archived", false)
      .single();

    if (error) {
      console.error(`Error fetching project with slug: ${slug}`, error);
      return null;
    }
    return data as unknown as Project;
  },

  async save(project: Project): Promise<Project> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .upsert(project)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save project: ${error.message}`);
    }
    return data as unknown as Project;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete project: ${id}`, error);
      return false;
    }
    return true;
  },
};
