import { redirect } from "next/navigation";
import Link from "next/link";
import { checkAuth, logout } from "@/actions/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();

  // Route Guard Protection
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const handleLogoutAction = async () => {
    "use server";
    await logout();
    redirect("/admin/login");
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Console Overview", icon: "grid" },
    { href: "/admin/dashboard/projects", label: "Projects CRUD", icon: "folder" },
    { href: "/admin/dashboard/reels", label: "Reels Showcase", icon: "video" },
    { href: "/admin/dashboard/media", label: "Media Library", icon: "image" },
    { href: "/admin/dashboard/messages", label: "Inquiries Inbox", icon: "mail" },
    { href: "/admin/dashboard/settings", label: "System Config", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-black flex text-ink">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-panel border-r border-white/5 flex flex-col hidden md:flex">
        {/* Branding header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/" className="logo font-display font-bold text-base tracking-tight flex items-center gap-2">
            <span className="dot w-2 h-2 rounded-full bg-gold-soft shadow-[0_0_8px_#f0c986]" />
            KAI RHODES
          </Link>
          <span className="font-mono text-[9px] text-gold-soft bg-gold-soft/10 px-2 py-0.5 rounded border border-gold-soft/20 uppercase tracking-widest">
            CMS
          </span>
        </div>

        {/* Links stack */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-ink-dim hover:text-ink hover:bg-white/[0.04] transition-all"
            >
              <span className="font-mono text-xs opacity-60">/ {link.label.split(" ")[0]}</span>
              <span className="ml-auto text-xs text-ink-faint font-mono">&middot;</span>
            </Link>
          ))}
        </nav>

        {/* Logout form */}
        <div className="p-4 border-t border-white/5">
          <form action={handleLogoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-danger/20 bg-danger/5 hover:bg-danger/10 text-danger text-sm font-medium transition-colors"
            >
              Sign out session
            </button>
          </form>
        </div>
      </aside>

      {/* Main workspace area */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Top bar header */}
        <header className="h-[70px] bg-panel/50 backdrop-blur border-b border-white/5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-faint">
              SYSTEM LEVEL: ROOT
            </span>
            <span className="h-4 w-[1px] bg-white/10" />
            <span className="font-mono text-xs text-emerald-400">
              ● LOCAL FALLBACK DATA ONLINE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-ink-dim hover:text-ink border border-white/10 px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all"
            >
              Visit live site &rarr;
            </Link>
          </div>
        </header>

        {/* Dynamic content placeholder */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
