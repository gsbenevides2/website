import { geoFromHeaders } from "@/utils/geo";
import { NextResponse } from "next/server";

// IP e localização do visitante; o front põe isto no contexto de todo evento do RUM.
export async function GET(request: Request) {
  return NextResponse.json(geoFromHeaders(request.headers), {
    headers: { "cache-control": "no-store" },
  });
}
