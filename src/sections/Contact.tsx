"use client";

import { useState } from "react";
import { PortfolioSettings } from "@/lib/db";
import { submitContactForm } from "@/actions/contact";

interface ContactProps {
  settings: PortfolioSettings;
}

export default function Contact({ settings }: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMsg(res.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Failed to send message. Please check connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-[150px] md:py-[150px] py-[100px] relative z-[2]">
      <div className="wrap">
        {/* Section Head */}
        <div className="sec-head flex justify-between items-end gap-10 mb-16 flex-wrap">
          <div>
            <div className="eyebrow flex items-center gap-[10px] font-mono text-[12px] tracking-[0.18em] uppercase text-gold-soft mb-[18px]">
              <span className="w-[22px] h-[1px] bg-gold-soft" />
              Contact
            </div>
            <h2 className="h-display font-display text-[clamp(34px,5vw,58px)] font-bold tracking-tight leading-[1.02]">
              Let&apos;s cut
              <br />
              something great.
            </h2>
          </div>
          <p className="sec-desc max-w-[340px] text-ink-dim text-[15px] leading-[1.5]">
            Tell me about the project — timeline, footage, and the outcome you&apos;re after. I reply within 24 hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-[70px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="field">
              <label htmlFor="cf-name" className="block text-[12px] text-ink-faint uppercase tracking-[0.08em] mb-2.5">
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full py-3.5 bg-transparent border-b border-white/9 text-base text-ink outline-none focus:border-gold-soft transition-colors"
              />
            </div>
            <div className="field">
              <label htmlFor="cf-email" className="block text-[12px] text-ink-faint uppercase tracking-[0.08em] mb-2.5">
                Email
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                placeholder="you@studio.com"
                className="w-full py-3.5 bg-transparent border-b border-white/9 text-base text-ink outline-none focus:border-gold-soft transition-colors"
              />
            </div>
            <div className="field">
              <label htmlFor="cf-project" className="block text-[12px] text-ink-faint uppercase tracking-[0.08em] mb-2.5">
                Project type
              </label>
              <input
                id="cf-project"
                name="projectType"
                type="text"
                placeholder="Brand film, commercial, wedding…"
                className="w-full py-3.5 bg-transparent border-b border-white/9 text-base text-ink outline-none focus:border-gold-soft transition-colors"
              />
            </div>
            <div className="field">
              <label htmlFor="cf-msg" className="block text-[12px] text-ink-faint uppercase tracking-[0.08em] mb-2.5">
                Message
              </label>
              <textarea
                id="cf-msg"
                name="message"
                required
                placeholder="Tell me about your footage and timeline"
                rows={3}
                className="w-full py-3.5 bg-transparent border-b border-white/9 text-base text-ink outline-none focus:border-gold-soft transition-colors resize-y min-h-[90px]"
              />
            </div>

            {/* Notification messages */}
            {success && (
              <p className="text-emerald-400 font-mono text-xs">
                ✓ MESSAGE RECEIVED. EXPECT A RESPONSE WITHIN 24 HOURS.
              </p>
            )}
            {errorMsg && (
              <p className="text-danger font-mono text-xs">
                ✗ ERROR: {errorMsg.toUpperCase()}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-gold-soft to-gold text-[#0c0a06] font-semibold text-sm shadow-[0_0_0_0_rgba(240,201,134,0.5)] hover:shadow-[0_0_40px_4px_rgba(240,201,134,0.45)] transition-all duration-400 ease-custom disabled:opacity-50 select-none cursor-none"
            >
              {loading ? "Sending..." : "Send message"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="w-4 h-4">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>

          {/* Contact Details Info Card */}
          <div className="contact-info-card glass p-9 rounded-2xl flex flex-col gap-6.5">
            <div className="ci-row flex justify-between items-center border-b border-white/9 pb-5">
              <span className="text-[12px] text-ink-faint uppercase tracking-[0.06em]">Email</span>
              <b className="text-[15px] font-medium hover:text-gold-soft transition-colors">
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </b>
            </div>
            <div className="ci-row flex justify-between items-center border-b border-white/9 pb-5">
              <span className="text-[12px] text-ink-faint uppercase tracking-[0.06em]">Phone</span>
              <b className="text-[15px] font-medium">{settings.phone}</b>
            </div>
            <div className="ci-row flex justify-between items-center border-b border-white/9 pb-5">
              <span className="text-[12px] text-ink-faint uppercase tracking-[0.06em]">Studio</span>
              <b className="text-[15px] font-medium">{settings.address}</b>
            </div>
            <div className="ci-row flex justify-between items-center">
              <span className="text-[12px] text-ink-faint uppercase tracking-[0.06em]">Availability</span>
              <b className="text-[15px] font-medium text-gold-soft">{settings.availability}</b>
            </div>

            <a
              href={settings.calendly_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost font-medium text-[13px] px-5 py-[11px] rounded-full border border-white/10 bg-white/5 backdrop-blur-[20px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all mt-2 select-none"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              Book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
