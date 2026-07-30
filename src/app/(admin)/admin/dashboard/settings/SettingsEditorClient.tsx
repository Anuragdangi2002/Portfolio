"use client";

import { useState } from "react";
import { PortfolioSettings } from "@/lib/db";
import { saveSettingsAction } from "@/actions/settings";

interface SettingsEditorClientProps {
  initialSettings: PortfolioSettings;
}

export default function SettingsEditorClient({
  initialSettings,
}: SettingsEditorClientProps) {
  const [settings, setSettings] = useState<PortfolioSettings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSocialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      socials: {
        ...settings.socials,
        [name]: value,
      },
    });
  };

  const handleSeoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      seo: {
        ...settings.seo,
        [name]: value,
      },
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await saveSettingsAction(settings);
      if (res.success) {
        setStatusMsg("Settings saved successfully");
      } else {
        setStatusMsg(res.error || "Failed to save settings");
      }
    } catch (err) {
      setStatusMsg("An unexpected error occurred saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">System Config</h1>
        <p className="text-sm text-ink-dim mt-1.5">
          Edit global copy variables, contact details, socials visibility, and SEO indices.
        </p>
      </div>

      {statusMsg && (
        <p className="text-xs font-mono text-gold-soft uppercase tracking-wider bg-white/5 p-3 rounded-lg">
          {statusMsg}
        </p>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Section 1: Hero & About */}
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-lg font-bold text-ink border-b border-white/5 pb-3">
            Hero & Bio Biography
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Full Name</label>
              <input
                name="name"
                required
                value={settings.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Hero Headline</label>
              <input
                name="headline"
                required
                value={settings.headline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Hero Subtitle</label>
              <textarea
                name="subtitle"
                required
                rows={2}
                value={settings.subtitle}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Biography Copy</label>
              <textarea
                name="biography"
                required
                rows={6}
                value={settings.biography}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Years Experience</label>
              <input
                name="years_experience"
                type="number"
                required
                value={settings.years_experience}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    years_experience: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Availability Tag</label>
              <input
                name="availability"
                required
                value={settings.availability}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Profile Image URL</label>
              <input
                name="profile_image_url"
                required
                value={settings.profile_image_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-lg font-bold text-ink border-b border-white/5 pb-3">
            Contact Indices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Contact Email</label>
              <input
                name="email"
                required
                type="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Contact Phone</label>
              <input
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Studio Location</label>
              <input
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Calendly Call Link</label>
              <input
                name="calendly_link"
                value={settings.calendly_link}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Socials */}
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-lg font-bold text-ink border-b border-white/5 pb-3">
            Social Profiles Visibility
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">LinkedIn URL</label>
              <input
                name="linkedin"
                value={settings.socials.linkedin}
                onChange={handleSocialsChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Instagram URL</label>
              <input
                name="instagram"
                value={settings.socials.instagram}
                onChange={handleSocialsChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">YouTube URL</label>
              <input
                name="youtube"
                value={settings.socials.youtube}
                onChange={handleSocialsChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">X / Twitter URL</label>
              <input
                name="x"
                value={settings.socials.x}
                onChange={handleSocialsChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 4: SEO settings */}
        <div className="glass p-6 md:p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-lg font-bold text-ink border-b border-white/5 pb-3">
            Search Engine Optimizations (SEO)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Meta Title Tag</label>
              <input
                name="meta_title"
                required
                value={settings.seo.meta_title}
                onChange={handleSeoChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Meta Description Tag</label>
              <textarea
                name="meta_description"
                required
                rows={3}
                value={settings.seo.meta_description}
                onChange={handleSeoChange}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] text-ink-faint uppercase tracking-wider">Meta Keywords (Comma-separated)</label>
              <input
                name="keywords"
                value={settings.seo.keywords}
                onChange={handleSeoChange}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm focus:border-gold-soft transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Form Action submission */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-gold-soft text-black font-semibold text-sm hover:bg-gold transition-colors disabled:opacity-50"
          >
            {loading ? "Saving Config..." : "Commit System Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
