"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(email: string, password: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Login action error", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error("Logout action error", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function checkAuth() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch (e) {
    return false;
  }
}
