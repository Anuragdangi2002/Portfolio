"use client";

import { useState } from "react";
import { Reel } from "@/lib/db";
import { saveReelAction, deleteReelAction } from "@/actions/reels";

interface ReelsManagerClientProps {
  initialReels: Reel[];
}

export default function ReelsManagerClient({
  initialReels,
}: ReelsManagerClientProps) {
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleEditClick = (reel: Reel) => {
    setEditingReel(reel);
    setIsAddMode(false);
    setStatusMsg("");
  };

  const handleAddClick = () => {
    const newReel: Reel = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      video_url: "",
      thumbnail_url: "",
      description: "",
      category: "reels",
      views_count: "0 views",
      tags: [],
    };
    setEditingReel(newReel);
    setIsAddMode(true);
    setStatusMsg("");
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reel?")) return;
    setLoading(true);

    try {
      const res = await deleteReelAction(id);
      if (res.success) {
        setReels(reels.filter((r) => r.id !== id));
        setStatusMsg("Reel deleted successfully");
      } else {
        setStatusMsg("Failed to delete reel");
      }
    } catch (e) {
      setStatusMsg("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingReel) return;
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await saveReelAction(editingReel);
      if (res.success) {
        if (isAddMode) {
          setReels([...reels, editingReel]);
        } else {
          setReels(
            reels.map((r) => (r.id === editingReel.id ? editingReel : r))
          );
        }
        setEditingReel(null);
        setIsAddMode(false);
        setStatusMsg("Reel saved successfully");
      } else {
        setStatusMsg(res.error || "Failed to save reel");
      }
    } catch (error) {
      setStatusMsg("An error occurred saving");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editingReel) return;
    const { name, value } = e.target;
    setEditingReel({
      ...editingReel,
      [name]: value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingReel) return;
    const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
    setEditingReel({
      ...editingReel,
      tags,
    });
  };

  return (
    <div className="space-y-8 select-none">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Reels Manager</h1>
          <p className="text-sm text-ink-dim mt-1.5">
            Manage vertical reels and short-form video content lists.
          </p>
        </div>
        {!editingReel && (
          <button
            onClick={handleAddClick}
            className="px-5 py-2.5 rounded-full bg-gold-soft text-black font-semibold text-sm hover:bg-gold transition-colors"
          >
            + Add Reel
          </button>
        )}
      </div>

      {statusMsg && (
        <p className="text-xs font-mono text-gold-soft uppercase tracking-wider bg-white/5 p-3 rounded-lg">
          {statusMsg}
        </p>
      )}

      {/* Reel Editor */}
      {editingReel && (
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="font-display text-xl font-bold text-ink">
              {isAddMode ? "New vertical Reel" : `Edit: ${editingReel.title}`}
            </h2>
            <button
              onClick={() => {
                setEditingReel(null);
                setIsAddMode(false);
              }}
              className="text-xs text-ink-faint hover:text-ink transition-colors"
            >
              Cancel &rarr;
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Reel Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Studio Sessions"
                  value={editingReel.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Views Count */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Views Count Overlay</label>
                <input
                  name="views_count"
                  placeholder="e.g. 1.2M views"
                  value={editingReel.views_count}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Video URL */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Video URL (Direct MP4)</label>
                <input
                  name="video_url"
                  required
                  placeholder="https://cdn.coverr.co/..."
                  value={editingReel.video_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Thumbnail Image URL</label>
                <input
                  name="thumbnail_url"
                  placeholder="https://images.unsplash.com/..."
                  value={editingReel.thumbnail_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Tags (Comma-separated)</label>
                <input
                  name="tags"
                  placeholder="Studio, BTS, Grading"
                  value={editingReel.tags.join(", ")}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Alt Description</label>
              <textarea
                name="description"
                rows={2}
                placeholder="Brief description for SEO alt tags..."
                value={editingReel.description || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setEditingReel(null);
                  setIsAddMode(false);
                }}
                className="px-6 py-3 rounded-xl border border-white/10 text-ink-dim hover:text-ink text-sm font-medium transition-colors"
              >
                Close Editor
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gold-soft text-black font-semibold text-sm hover:bg-gold transition-colors disabled:opacity-50"
              >
                {loading ? "Commiting..." : "Commit Reel Details"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reels List table */}
      {!editingReel && (
        <div className="glass rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-panel-2 font-mono text-[10px] text-ink-faint uppercase tracking-widest">
                <th className="p-4 pl-6">Title</th>
                <th className="p-4">Views</th>
                <th className="p-4">Tags</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reels.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 font-medium text-ink flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_#57c7d4]" />
                    {r.title}
                  </td>
                  <td className="p-4 text-ink-dim font-mono text-xs">{r.views_count}</td>
                  <td className="p-4 text-ink-dim font-mono text-xs">{r.tags.join(", ")}</td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(r)}
                      className="text-xs text-gold-soft hover:text-gold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(r.id)}
                      className="text-xs text-danger hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {reels.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-ink-faint font-mono text-xs">
                    NO REELS PUBLISHED. CLICK ADD REEL TO CREATE ONE.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
