import { ReelsRepository } from "@/lib/repositories/ReelsRepository";
import ReelsManagerClient from "./ReelsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminReelsPage() {
  const reels = await ReelsRepository.getAll();

  return <ReelsManagerClient initialReels={reels} />;
}
