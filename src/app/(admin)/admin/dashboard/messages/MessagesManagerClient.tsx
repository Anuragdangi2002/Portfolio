"use client";

import { useState } from "react";
import { ContactMessage } from "@/lib/db";
import { deleteMessageAction, markMessageReadAction } from "@/actions/messages";

interface MessagesManagerClientProps {
  initialMessages: ContactMessage[];
}

export default function MessagesManagerClient({
  initialMessages,
}: MessagesManagerClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleMessageClick = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      // Mark read server-side
      try {
        await markMessageReadAction(msg.id, true);
        // Update local state
        setMessages(
          messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
      } catch (e) {
        console.error("Failed to mark message read");
      }
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;
    setLoading(true);

    try {
      const res = await deleteMessageAction(id);
      if (res.success) {
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        setStatusMsg("Message deleted successfully");
      } else {
        setStatusMsg("Failed to delete message");
      }
    } catch (err) {
      setStatusMsg("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter & Search
  const filtered = messages.filter((msg) => {
    const matchesFilter = filter === "all" || !msg.read;
    const matchesSearch =
      search.trim() === "" ||
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase()) ||
      (msg.project_type && msg.project_type.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Inquiries Inbox</h1>
        <p className="text-sm text-ink-dim mt-1.5">
          Read, organize, and manage client submissions from the contact form.
        </p>
      </div>

      {statusMsg && (
        <p className="text-xs font-mono text-gold-soft uppercase tracking-wider bg-white/5 p-3 rounded-lg">
          {statusMsg}
        </p>
      )}

      {/* Grid: Left Column messages list, Right Column reader */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Messages List Column */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-1.5">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  filter === "all" ? "bg-gold-soft text-black" : "bg-white/5 text-ink-dim"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  filter === "unread" ? "bg-gold-soft text-black" : "bg-white/5 text-ink-dim"
                }`}
              >
                Unread
              </button>
            </div>

            <input
              type="text"
              placeholder="Search inbox..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/9 outline-none text-xs text-ink placeholder-ink-faint w-44 focus:w-56 focus:border-gold-soft transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleMessageClick(msg)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative hover:border-white/20 ${
                  selectedMessage?.id === msg.id
                    ? "bg-white/[0.04] border-gold-soft"
                    : msg.read
                    ? "bg-black/40 border-white/5"
                    : "bg-panel-2 border-cyan/40"
                }`}
              >
                {!msg.read && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan shadow-[0_0_6px_#57c7d4]" />
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-ink">{msg.name}</span>
                    <span className="text-[9px] font-mono text-ink-faint">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-gold-soft font-mono mt-0.5">
                    {msg.project_type || "General Inquiry"}
                  </div>
                  <p className="text-xs text-ink-dim line-clamp-2 mt-2 leading-[1.4]">
                    {msg.message}
                  </p>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={(e) => handleDeleteClick(e, msg.id)}
                    className="text-xs text-danger hover:text-red-400 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center py-12 text-xs text-ink-faint font-mono bg-white/[0.02] rounded-xl border border-white/5">
                NO INBOX MESSAGES RECORDED.
              </p>
            )}
          </div>
        </div>

        {/* Reader Column */}
        <div className="glass p-6 md:p-8 rounded-2xl h-fit min-h-[360px] flex flex-col justify-between relative shadow-xl">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Header metadata */}
              <div className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h2 className="text-xl font-bold font-display text-ink leading-tight">
                      {selectedMessage.name}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-xs text-gold-soft hover:underline font-mono mt-1 block"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="text-right font-mono text-xs text-ink-faint">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="mt-4 flex gap-4 text-xs font-mono text-ink-dim">
                  <div>
                    <span className="text-ink-faint uppercase text-[9px] tracking-widest block">Type</span>
                    <b>{selectedMessage.project_type || "General Inquiry"}</b>
                  </div>
                </div>
              </div>

              {/* Message text */}
              <div>
                <span className="text-ink-faint font-mono text-[9px] uppercase tracking-widest block mb-2">Message Body</span>
                <p className="text-ink-dim text-sm leading-[1.6] whitespace-pre-line bg-black/40 p-4.5 rounded-xl border border-white/5">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Portfolio Inquiry`}
                  className="px-5 py-2.5 rounded-xl bg-gold-soft text-black font-semibold text-xs hover:bg-gold transition-colors flex items-center gap-1.5"
                >
                  Reply Email &rarr;
                </a>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-10 h-10 stroke-ink-faint mb-4"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 14h4" />
              </svg>
              <h3 className="font-display text-base font-semibold text-ink">Inquiry Reader</h3>
              <p className="text-xs text-ink-faint max-w-[240px] mt-1.5">
                Select any inquiry card on the left panel to inspect the email details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
