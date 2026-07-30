import { PortfolioSettingsRepository } from "@/lib/repositories/PortfolioSettingsRepository";
import SettingsEditorClient from "./SettingsEditorClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await PortfolioSettingsRepository.get();

  return <SettingsEditorClient initialSettings={settings} />;
}
