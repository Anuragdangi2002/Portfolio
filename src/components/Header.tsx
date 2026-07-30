"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "portfolio", "testimonials", "contact"];
      let current = "";
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 150 && rect.bottom > 150) {
            current = id;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "#about", label: "About", id: "about" },
    { href: "#projects", label: "Work", id: "projects" },
    { href: "#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "#testimonials", label: "Clients", id: "testimonials" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] py-[22px] transition-all">
      <div className="wrap flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="logo font-display font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="dot w-[7px] h-[7px] rounded-full bg-gold-soft shadow-[0_0_10px_#f0c986]" />
          KAI RHODES
        </a>

        {/* Desktop Nav */}
        <nav className="nav-pill flex gap-[2px] p-[6px] rounded-full bg-white/5 border border-white/10 backdrop-blur-[20px] hidden lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${
                activeSection === link.id
                  ? "bg-gold-soft text-black"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="nav-cta flex items-center gap-4">
          <a
            href="#contact"
            className="btn-ghost font-medium text-[13px] px-5 py-[11px] rounded-full border border-white/10 bg-white/5 backdrop-blur-[20px] transition-all hover:bg-white/10 hidden md:block"
          >
            Start a project
          </a>
          <button
            onClick={toggleMobileMenu}
            className="menu-toggle flex lg:hidden w-[42px] h-[42px] rounded-full border border-white/10 bg-white/5 items-center justify-center flex-col gap-1"
            aria-label="Toggle Menu"
          >
            <span className="w-4 h-[1px] bg-ink transition-transform" />
            <span className="w-4 h-[1px] bg-ink transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed top-[78px] left-[22px] right-[22px] flex flex-col p-4 rounded-[18px] bg-panel-2 border border-white/10 backdrop-blur-[25px] gap-2 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-center text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? "bg-gold-soft text-black"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl text-center text-sm font-semibold bg-white/10 hover:bg-white/15"
          >
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
