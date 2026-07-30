import { createClient } from "@/utils/supabase/server";
import { PortfolioSettings } from "@/lib/db";

export const PortfolioSettingsRepository = {
  async get(): Promise<PortfolioSettings> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_settings")
      .select("*")
      .eq("id", "singleton")
      .single();

    if (error) {
      console.error("Error fetching portfolio settings from Supabase", error);
      // Return a blank default state if missing
      return {
        name: "Kai Rhodes",
        headline: "FRAME BY FRAME, STORY BY DESIGN.",
        subtitle: "Cinematic video editor crafting commercials, films, and motion graphics.",
        biography: "",
        years_experience: 12,
        availability: "Booking select slots",
        email: "hello@kairhodes.film",
        phone: "",
        address: "",
        working_hours: "",
        calendly_link: "",
        maps_link: "",
        resume_url: "",
        profile_image_url: "",
        socials: {
          linkedin: "",
          instagram: "",
          youtube: "",
          behance: "",
          dribbble: "",
          x: "",
          facebook: "",
          whatsapp: "",
        },
        seo: {
          meta_title: "Kai Rhodes — Film & Motion Editor",
          meta_description: "Cinematic video editor.",
          keywords: "editing",
        },
        stats: [],
        theme: {
          accent_color: "#f0c986",
          secondary_color: "#57c7d4",
          enable_grain: true,
          enable_cursor: true,
        },
      };
    }
    return data as unknown as PortfolioSettings;
  },

  async update(settings: PortfolioSettings): Promise<PortfolioSettings> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_settings")
      .upsert({ id: "singleton", ...settings })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update settings: ${error.message}`);
    }
    return data as unknown as PortfolioSettings;
  },
};
