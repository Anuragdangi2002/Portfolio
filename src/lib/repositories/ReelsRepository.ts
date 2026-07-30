import { createClient } from "@/utils/supabase/server";
import { Reel } from "@/lib/db";

export const ReelsRepository = {
  async getAll(): Promise<Reel[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("reels").select("*");
    if (error) {
      console.error("Error fetching reels from Supabase", error);
      return [];
    }
    return (data || []) as Reel[];
  },

  async save(reel: Reel): Promise<Reel> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reels")
      .upsert(reel)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save reel: ${error.message}`);
    }
    return data as Reel;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("reels").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete reel: ${id}`, error);
      return false;
    }
    return true;
  },
};
