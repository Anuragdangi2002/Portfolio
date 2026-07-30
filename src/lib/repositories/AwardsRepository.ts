import { createClient } from "@/utils/supabase/server";
import { Award } from "@/lib/db";

export const AwardsRepository = {
  async getAll(): Promise<Award[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("awards")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching awards from Supabase", error);
      return [];
    }
    return (data || []) as Award[];
  },

  async save(award: Award): Promise<Award> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("awards")
      .upsert(award)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save award: ${error.message}`);
    }
    return data as Award;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("awards").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete award: ${id}`, error);
      return false;
    }
    return true;
  },
};
