import { redirect } from "next/navigation";
import { checkAuth } from "@/actions/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
