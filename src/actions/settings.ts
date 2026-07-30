"use server";

import { revalidatePath } from "next/cache";
import { PortfolioSettings } from "@/lib/db";
import { PortfolioSettingsRepository } from "@/lib/repositories/PortfolioSettingsRepository";

export async function saveSettingsAction(settings: PortfolioSettings) {
  try {
    const updated = await PortfolioSettingsRepository.update(settings);
    revalidatePath("/");
    return { success: true, settings: updated };
  } catch (error) {
    console.error("Failed to update settings server-side", error);
    return { success: false, error: "Database update failed" };
  }
}
