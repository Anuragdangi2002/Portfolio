import { MessagesRepository } from "@/lib/repositories/MessagesRepository";
import MessagesManagerClient from "./MessagesManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await MessagesRepository.getAll();

  return <MessagesManagerClient initialMessages={messages} />;
}
