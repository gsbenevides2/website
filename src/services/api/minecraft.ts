import { BedrockPingResponse } from "@minescope/mineping";

export async function getServerStatus(isPreview: boolean): Promise<BedrockPingResponse> {
  const res = await fetch("/api/minecraft?isPreview=" + isPreview);
  if (!res.ok) throw new Error("Failed to fetch server status");
  return await res.json();
}
