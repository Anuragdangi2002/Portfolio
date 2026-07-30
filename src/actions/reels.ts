"use server";

import { revalidatePath } from "next/cache";
import { Reel } from "@/lib/db";
import { ReelsRepository } from "@/lib/repositories/ReelsRepository";

export async function saveReelAction(reel: Reel) {
  try {
    const saved = await ReelsRepository.save(reel);
    revalidatePath("/");
    return { success: true, reel: saved };
  } catch (error) {
    console.error("Failed to save reel server-side", error);
    return { success: false, error: "Database save failed" };
  }
}

export async function deleteReelAction(id: string) {
  try {
    const success = await ReelsRepository.delete(id);
    revalidatePath("/");
    return { success };
  } catch (error) {
    console.error("Failed to delete reel server-side", error);
    return { success: false, error: "Database delete failed" };
  }
}
