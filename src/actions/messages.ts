"use server";

import { revalidatePath } from "next/cache";
import { MessagesRepository } from "@/lib/repositories/MessagesRepository";

export async function deleteMessageAction(id: string) {
  try {
    const success = await MessagesRepository.delete(id);
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/dashboard/messages");
    return { success };
  } catch (error) {
    console.error("Failed to delete message server-side", error);
    return { success: false, error: "Database delete failed" };
  }
}

export async function markMessageReadAction(id: string, read: boolean) {
  try {
    const messages = await MessagesRepository.getAll();
    const message = messages.find((m) => m.id === id);
    if (!message) return { success: false, error: "Message not found" };

    const updatedMessage = { ...message, read };
    await MessagesRepository.save(updatedMessage);
    
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/dashboard/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update message read state server-side", error);
    return { success: false, error: "Database update failed" };
  }
}
