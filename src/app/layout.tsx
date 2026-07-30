import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PortfolioSettingsRepository } from "@/lib/repositories/PortfolioSettingsRepository";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await PortfolioSettingsRepository.get();
    return {
      title: settings.seo?.meta_title || "Kai Rhodes — Film & Motion Editor",
      description: settings.seo?.meta_description || "Kai Rhodes is a cinematic video editor crafting commercials, films, and motion graphics for global brands.",
      keywords: settings.seo?.keywords || "video editor, motion design, color grading, showcase",
    };
  } catch (e) {
    return {
      title: "Kai Rhodes — Film & Motion Editor",
      description: "Kai Rhodes is a cinematic video editor crafting commercials, films, and motion graphics for global brands.",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="bg-black text-ink min-h-screen flex flex-col font-body">
        {children}
      </body>
    </html>
  );
}
