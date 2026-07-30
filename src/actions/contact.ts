"use server";

import { z } from "zod";
import { ContactMessage } from "@/lib/db";
import { MessagesRepository } from "@/lib/repositories/MessagesRepository";

// Contact form schema validation
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  // Validate the input fields
  const result = contactFormSchema.safeParse({
    name,
    email,
    projectType,
    message,
  });

  if (!result.success) {
    const errorMsg = result.error.issues[0]?.message || "Invalid form data";
    return { success: false, error: errorMsg };
  }

  const newMessage: ContactMessage = {
    id: Math.random().toString(36).substr(2, 9), // simple unique id generator
    name: result.data.name,
    email: result.data.email,
    project_type: result.data.projectType || "",
    message: result.data.message,
    read: false,
    replied: false,
    created_at: new Date().toISOString(),
  };

  try {
    await MessagesRepository.save(newMessage);
    return { success: true };
  } catch (error) {
    console.error("Error saving message", error);
    return { success: false, error: "Database error. Please try again." };
  }
}
