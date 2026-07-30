import { createClient } from "@/utils/supabase/server";
import { Testimonial } from "@/lib/db";

export const TestimonialsRepository = {
  async getAll(visibleOnly = false): Promise<Testimonial[]> {
    const supabase = await createClient();
    let query = supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (visibleOnly) {
      query = query.eq("visible", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching testimonials from Supabase", error);
      return [];
    }
    return (data || []) as Testimonial[];
  },

  async save(testimonial: Testimonial): Promise<Testimonial> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .upsert(testimonial)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save testimonial: ${error.message}`);
    }
    return data as Testimonial;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete testimonial: ${id}`, error);
      return false;
    }
    return true;
  },
};
