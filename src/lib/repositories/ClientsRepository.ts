import { createClient } from "@/utils/supabase/server";
import { ClientLogo } from "@/lib/db";

export const ClientsRepository = {
  async getAll(visibleOnly = false): Promise<ClientLogo[]> {
    const supabase = await createClient();
    let query = supabase
      .from("clients")
      .select("*")
      .order("sort_order", { ascending: true });

    if (visibleOnly) {
      query = query.eq("visible", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching clients from Supabase", error);
      return [];
    }
    return (data || []) as ClientLogo[];
  },

  async save(client: ClientLogo): Promise<ClientLogo> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("clients")
      .upsert(client)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save client logo: ${error.message}`);
    }
    return data as ClientLogo;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete client: ${id}`, error);
      return false;
    }
    return true;
  },
};
