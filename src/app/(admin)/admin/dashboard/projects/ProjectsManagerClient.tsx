"use client";

import { useState } from "react";
import { Project } from "@/lib/db";
import { saveProjectAction, deleteProjectAction } from "@/actions/projects";

interface ProjectsManagerClientProps {
  initialProjects: Project[];
}

export default function ProjectsManagerClient({
  initialProjects,
}: ProjectsManagerClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsAddMode(false);
    setStatusMsg("");
  };

  const handleAddClick = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      slug: "",
      category: "commercials",
      featured: false,
      thumbnail_url: "",
      cover_url: "",
      video_url: "",
      client: "",
      year: new Date().getFullYear().toString(),
      duration: "00:00",
      description: "",
      challenge: "",
      process: "",
      results: "",
      gallery_images: [],
      software_used: [],
      project_tags: [],
      sort_order: projects.length + 1,
      archived: false,
    };
    setEditingProject(newProject);
    setIsAddMode(true);
    setStatusMsg("");
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);

    try {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects(projects.filter((p) => p.id !== id));
        setStatusMsg("Project deleted successfully");
      } else {
        setStatusMsg("Failed to delete project");
      }
    } catch (e) {
      setStatusMsg("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateClick = async (project: Project) => {
    setLoading(true);
    const duplicated: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      title: `${project.title} Copy`,
      slug: `${project.slug}-copy`,
      sort_order: projects.length + 1,
    };

    try {
      const res = await saveProjectAction(duplicated);
      if (res.success) {
        setProjects([...projects, duplicated]);
        setStatusMsg("Project duplicated successfully");
      } else {
        setStatusMsg("Failed to duplicate project");
      }
    } catch (e) {
      setStatusMsg("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await saveProjectAction(editingProject);
      if (res.success) {
        if (isAddMode) {
          setProjects([...projects, editingProject]);
        } else {
          setProjects(
            projects.map((p) => (p.id === editingProject.id ? editingProject : p))
          );
        }
        setEditingProject(null);
        setIsAddMode(false);
        setStatusMsg("Project saved successfully");
      } else {
        setStatusMsg(res.error || "Failed to save project");
      }
    } catch (error) {
      setStatusMsg("An unexpected error occurred saving");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editingProject) return;
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setEditingProject({
      ...editingProject,
      [name]: parsedValue,
    });
  };

  // Helper to change tags / tools array fields
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "software_used" | "project_tags"
  ) => {
    if (!editingProject) return;
    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
    setEditingProject({
      ...editingProject,
      [field]: arr,
    });
  };

  return (
    <div className="space-y-8 select-none">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Projects Manager</h1>
          <p className="text-sm text-ink-dim mt-1.5">
            Add, update, duplicate, or delete cinematic showreel pieces.
          </p>
        </div>
        {!editingProject && (
          <button
            onClick={handleAddClick}
            className="px-5 py-2.5 rounded-full bg-gold-soft text-black font-semibold text-sm hover:bg-gold transition-colors"
          >
            + Add Project
          </button>
        )}
      </div>

      {statusMsg && (
        <p className="text-xs font-mono text-gold-soft uppercase tracking-wider bg-white/5 p-3 rounded-lg">
          {statusMsg}
        </p>
      )}

      {/* Editor Modal / Container */}
      {editingProject && (
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="font-display text-xl font-bold text-ink">
              {isAddMode ? "New Portfolio Project" : `Edit: ${editingProject.title}`}
            </h2>
            <button
              onClick={() => {
                setEditingProject(null);
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
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Project Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Solace — Launch Film"
                  value={editingProject.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm placeholder-ink-faint focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">URL Slug</label>
                <input
                  name="slug"
                  required
                  placeholder="e.g. solace-launch-film"
                  value={editingProject.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm placeholder-ink-faint focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Category</label>
                <select
                  name="category"
                  value={editingProject.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                >
                  <option value="commercials">Commercials</option>
                  <option value="reels">Reels</option>
                  <option value="shorts">Shorts</option>
                  <option value="youtube">YouTube</option>
                  <option value="weddings">Weddings</option>
                  <option value="motion">Motion Graphics</option>
                  <option value="ads">Ads</option>
                </select>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3.5 pt-7.5">
                <input
                  type="checkbox"
                  id="featured-check"
                  name="featured"
                  checked={editingProject.featured}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      featured: e.target.checked,
                    })
                  }
                  className="w-4.5 h-4.5 bg-black border-white/9 rounded text-gold-soft focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-sm font-medium text-ink cursor-pointer select-none">
                  Display as Featured Project
                </label>
              </div>

              {/* Thumbnail image */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Thumbnail Image URL</label>
                <input
                  name="thumbnail_url"
                  placeholder="https://images.unsplash.com/..."
                  value={editingProject.thumbnail_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Cover Banner URL</label>
                <input
                  name="cover_url"
                  placeholder="https://images.unsplash.com/..."
                  value={editingProject.cover_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Video URL */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Video Clip URL (Direct MP4)</label>
                <input
                  name="video_url"
                  placeholder="https://cdn.coverr.co/..."
                  value={editingProject.video_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Client / Brand</label>
                <input
                  name="client"
                  placeholder="e.g. Solace Labs"
                  value={editingProject.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Year */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Release Year</label>
                <input
                  name="year"
                  placeholder="e.g. 2025"
                  value={editingProject.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Video Duration</label>
                <input
                  name="duration"
                  placeholder="e.g. 01:32"
                  value={editingProject.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Software list */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Software Used (Comma-separated)</label>
                <input
                  name="software_used"
                  placeholder="Premiere Pro, DaVinci Resolve, After Effects"
                  value={editingProject.software_used.join(", ")}
                  onChange={(e) => handleArrayChange(e, "software_used")}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>

              {/* Tags list */}
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Tags (Comma-separated)</label>
                <input
                  name="project_tags"
                  placeholder="Brand Film, Sound Design, Color Grading"
                  value={editingProject.project_tags.join(", ")}
                  onChange={(e) => handleArrayChange(e, "project_tags")}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
            </div>

            {/* Description / Summary */}
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Description Summary</label>
              <textarea
                name="description"
                rows={3}
                placeholder="A brief summary of the film edit..."
                value={editingProject.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            {/* Case study challenge, process and results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Case Challenge</label>
                <textarea
                  name="challenge"
                  rows={4}
                  placeholder="The project problem brief..."
                  value={editingProject.challenge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Case Process</label>
                <textarea
                  name="process"
                  rows={4}
                  placeholder="The editing solutions & design stages..."
                  value={editingProject.process}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Case Results</label>
                <textarea
                  name="results"
                  rows={4}
                  placeholder="Performance stats / client quotes..."
                  value={editingProject.results}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
            </div>

            {/* Color grading image compares */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Raw Image (Before Grading)</label>
                <input
                  name="before_image_url"
                  placeholder="https://images.unsplash.com/... (Raw LOG state still)"
                  value={editingProject.before_image_url || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Graded Image (After Grading)</label>
                <input
                  name="after_image_url"
                  placeholder="https://images.unsplash.com/... (Cinematic Graded state still)"
                  value={editingProject.after_image_url || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
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
                {loading ? "Saving to schema..." : "Commit Project Details"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table List */}
      {!editingProject && (
        <div className="glass rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-panel-2 font-mono text-[10px] text-ink-faint uppercase tracking-widest">
                <th className="p-4 pl-6">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Client</th>
                <th className="p-4">Year</th>
                <th className="p-4">Featured</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 font-medium text-ink flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#d4a24c]" />
                    {p.title}
                  </td>
                  <td className="p-4 text-ink-dim font-mono text-xs uppercase">{p.category}</td>
                  <td className="p-4 text-ink-dim">{p.client}</td>
                  <td className="p-4 text-ink-dim font-mono text-xs">{p.year}</td>
                  <td className="p-4">
                    {p.featured ? (
                      <span className="font-mono text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded uppercase tracking-wider">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-ink-faint">-</span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="text-xs text-gold-soft hover:text-gold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicateClick(p)}
                      className="text-xs text-ink-dim hover:text-ink transition-colors"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="text-xs text-danger hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-ink-faint font-mono text-xs">
                    NO PROJECTS IN DATABASE. CLICK ADD PROJECT TO CREATE ONE.
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
