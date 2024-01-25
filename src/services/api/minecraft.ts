import { BedrockPingResponse } from "@minescope/mineping";

export async function getServerStatus(): Promise<BedrockPingResponse> {
  const res = await fetch("/api/minecraft");
  if (!res.ok) throw new Error("Failed to fetch server status");
  return await res.json();
}
