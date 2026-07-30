import Link from "next/link";
import { ProjectsRepository } from "@/lib/repositories/ProjectsRepository";
import { ReelsRepository } from "@/lib/repositories/ReelsRepository";
import { MessagesRepository } from "@/lib/repositories/MessagesRepository";
import { AnalyticsRepository } from "@/lib/repositories/AnalyticsRepository";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const [projects, reels, messages, analytics] = await Promise.all([
    ProjectsRepository.getAll(),
    ReelsRepository.getAll(),
    MessagesRepository.getAll(),
    AnalyticsRepository.getSummary(),
  ]);

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const statCards = [
    {
      title: "Portfolio Visitors",
      value: analytics.visitors,
      desc: "Cumulative count of unique site visits tracked.",
    },
    {
      title: "Project Views",
      value: analytics.projectViews,
      desc: "Total views registered across project details pages.",
    },
    {
      title: "Contact Messages",
      value: messages.length,
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : undefined,
      link: "/admin/dashboard/messages",
      linkLabel: "Open Inbox",
      desc: "Inquiries submitted via the public contact forms.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Console Overview</h1>
        <p className="text-sm text-ink-dim mt-1.5">
          General status parameters and stats indexes of the portfolio platform.
        </p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl flex flex-col justify-between h-[200px]">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-mono text-xs text-ink-faint uppercase tracking-[0.1em]">{card.title}</h3>
                {card.badge && (
                  <span className="font-mono text-[9px] text-danger bg-danger/10 border border-danger/25 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>
              <div className="text-[44px] font-display font-extrabold text-gold-soft leading-none mt-4">
                {card.value}
              </div>
              <p className="text-xs text-ink-dim mt-2">{card.desc}</p>
            </div>
            
            {card.link && card.linkLabel && (
              <Link
                href={card.link}
                className="text-xs font-semibold text-gold-soft hover:text-gold transition-colors flex items-center gap-1.5 mt-4"
              >
                {card.linkLabel} &rarr;
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Recent submissions list */}
      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h2 className="font-display text-lg font-bold text-ink">Recent Inquiries</h2>
          <Link
            href="/admin/dashboard/messages"
            className="text-xs text-gold-soft hover:text-gold transition-colors"
          >
            All messages &rarr;
          </Link>
        </div>

        <div className="space-y-4">
          {messages.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-start p-4 rounded-xl bg-black/40 border border-white/5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-ink">{m.name}</span>
                  <span className="text-[10px] font-mono text-ink-faint">({m.email})</span>
                </div>
                <p className="text-xs text-ink-dim line-clamp-1">{m.message}</p>
              </div>
              <span className="text-[10px] font-mono text-ink-faint">
                {new Date(m.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="text-center py-8 text-xs text-ink-faint font-mono">
              NO CONTACT SUBMISSIONS RECORDED.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
