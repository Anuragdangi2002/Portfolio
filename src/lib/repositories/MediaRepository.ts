import { createClient } from "@/utils/supabase/server";

export const MediaRepository = {
  async upload(
    bucketName: string,
    filePath: string,
    fileBody: File | Buffer | ArrayBuffer | Blob
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    const supabase = await createClient();

    // 1. Upload file to bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBody, {
        upsert: true,
      });

    if (error) {
      console.error(`Storage upload error inside bucket: ${bucketName}`, error);
      return { success: false, error: error.message };
    }

    // 2. Fetch public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      success: true,
      url: publicUrlData.publicUrl,
    };
  },

  async delete(
    bucketName: string,
    filePath: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error(`Storage delete error inside bucket: ${bucketName}`, error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async list(bucketName: string): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error(`Storage listing error inside bucket: ${bucketName}`, error);
      return [];
    }

    // Fetch public URL for each item
    return (data || []).map((file) => {
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(file.name);
      return {
        ...file,
        url: publicUrlData.publicUrl,
      };
    });
  },
};
