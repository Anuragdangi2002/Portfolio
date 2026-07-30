"use server";

import { revalidatePath } from "next/cache";
import { MediaRepository } from "@/lib/repositories/MediaRepository";

export async function uploadMediaAction(formData: FormData) {
  try {
    const bucket = formData.get("bucket") as string;
    const file = formData.get("file") as File;

    if (!bucket || !file) {
      return { success: false, error: "Missing bucket name or file upload content" };
    }

    // Validate size (limit 15MB for demo)
    if (file.size > 15 * 1024 * 1024) {
      return { success: false, error: "File exceeds 15MB size limit" };
    }

    // Convert file to ArrayBuffer to pass to Repository
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build unique path filename
    const fileExt = file.name.split(".").pop();
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const res = await MediaRepository.upload(bucket, cleanFileName, buffer);

    if (res.success && res.url) {
      revalidatePath("/admin/dashboard/media");
      return { success: true, url: res.url, name: cleanFileName };
    } else {
      return { success: false, error: res.error || "Failed uploading file" };
    }
  } catch (error: any) {
    console.error("Storage upload action exception", error);
    return { success: false, error: error.message || "Upload action exception" };
  }
}

export async function deleteMediaAction(bucketName: string, filePath: string) {
  try {
    const res = await MediaRepository.delete(bucketName, filePath);
    if (res.success) {
      revalidatePath("/admin/dashboard/media");
      return { success: true };
    }
    return { success: false, error: res.error };
  } catch (error: any) {
    console.error("Storage delete action exception", error);
    return { success: false, error: error.message };
  }
}

export async function listMediaAction(bucketName: string) {
  try {
    const files = await MediaRepository.list(bucketName);
    return { success: true, files };
  } catch (error: any) {
    console.error("Storage list action exception", error);
    return { success: false, files: [], error: error.message };
  }
}
