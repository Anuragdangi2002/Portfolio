"use client";

import { PortfolioSettings } from "@/lib/db";

interface FooterProps {
  settings: PortfolioSettings;
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-[90px] pb-[30px] border-t border-white/9 relative z-[2]">
      <div className="wrap">
        {/* Top footer row */}
        <div className="footer-top grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 md:gap-[50px] mb-20">
          
          {/* Brand block */}
          <div className="footer-brand select-none">
            <a href="#hero" className="logo font-display font-bold text-xl tracking-tight flex items-center gap-2 mb-4">
              <span className="dot w-[7px] h-[7px] rounded-full bg-gold-soft shadow-[0_0_10px_#f0c986]" />
              KAI RHODES
            </a>
            <p className="text-ink-dim text-sm max-w-[280px] leading-[1.5]">
              Cinematic editing for brands, filmmakers, and founders. Based in Los Angeles, working worldwide.
            </p>
          </div>

          {/* Sitemap links */}
          <div className="footer-col select-none">
            <h5 className="text-[12px] text-ink-faint uppercase tracking-[0.08em] font-semibold mb-5">
              Sitemap
            </h5>
            <div className="space-y-3">
              <a href="#about" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">About</a>
              <a href="#projects" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">Work</a>
              <a href="#portfolio" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">Portfolio</a>
              <a href="#contact" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">Contact</a>
            </div>
          </div>

          {/* Connect links */}
          <div className="footer-col select-none">
            <h5 className="text-[12px] text-ink-faint uppercase tracking-[0.08em] font-semibold mb-5">
              Connect
            </h5>
            <div className="space-y-3">
              <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">Instagram</a>
              <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">YouTube</a>
              <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">LinkedIn</a>
              <a href={`mailto:${settings.email}`} className="block text-sm text-ink-dim hover:text-gold-soft transition-colors duration-300">Email</a>
            </div>
          </div>

          {/* Newsletter block */}
          <div className="footer-col select-none">
            <h5 className="text-[12px] text-ink-faint uppercase tracking-[0.08em] font-semibold mb-5">
              Newsletter
            </h5>
            <p className="text-ink-dim text-[13.5px] leading-[1.5] mb-4">
              New work and behind-the-cuts notes, monthly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter flex border-b border-white/9 pb-3">
              <input
                type="email"
                placeholder="you@studio.com"
                required
                className="flex-1 bg-transparent border-none text-sm outline-none placeholder-ink-faint text-ink"
              />
              <button type="submit" className="text-sm text-gold-soft hover:text-gold transition-colors font-medium ml-2">
                Join &rarr;
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer row */}
        <div className="footer-bottom flex justify-between items-center text-[12.5px] text-ink-faint flex-wrap gap-4 select-none">
          <span>&copy; {new Date().getFullYear()} Kai Rhodes. All rights reserved.</span>
          
          <div className="socials flex gap-4">
            <a
              href={settings.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/9 flex items-center justify-center text-ink-dim hover:text-gold-soft hover:border-gold-soft transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </a>
            <a
              href={settings.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-9 h-9 rounded-full border border-white/9 flex items-center justify-center text-ink-dim hover:text-gold-soft hover:border-gold-soft transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a
              href={settings.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-white/9 flex items-center justify-center text-ink-dim hover:text-gold-soft hover:border-gold-soft transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" className="w-3.5 h-3.5">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" />
              </svg>
            </a>
          </div>

          <span
            onClick={scrollToTop}
            className="cursor-pointer hover:text-gold-soft transition-colors font-medium flex items-center gap-1"
          >
            Back to top &uarr;
          </span>
        </div>
      </div>
    </footer>
  );
}
