import { createClient } from "@/utils/supabase/server";
import { Service } from "@/lib/db";

export const ServicesRepository = {
  async getAll(visibleOnly = false): Promise<Service[]> {
    const supabase = await createClient();
    let query = supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (visibleOnly) {
      query = query.eq("visible", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching services from Supabase", error);
      return [];
    }
    return (data || []) as Service[];
  },

  async save(service: Service): Promise<Service> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .upsert(service)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save service: ${error.message}`);
    }
    return data as Service;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete service: ${id}`, error);
      return false;
    }
    return true;
  },
};
