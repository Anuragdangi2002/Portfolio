import { createClient } from "@/utils/supabase/server";
import { ContactMessage } from "@/lib/db";

export const MessagesRepository = {
  async getAll(): Promise<ContactMessage[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages from Supabase", error);
      return [];
    }
    return (data || []) as ContactMessage[];
  },

  async save(message: ContactMessage): Promise<ContactMessage> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .upsert(message)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save contact message: ${error.message}`);
    }
    return data as ContactMessage;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      console.error(`Failed to delete message: ${id}`, error);
      return false;
    }
    return true;
  },
};
