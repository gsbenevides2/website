import { trace } from "@opentelemetry/api";
import { NextResponse, type NextRequest } from "next/server";
import links from "./middlewares/links";
import storageDirectDownload from "./middlewares/storageDirectDownload";
import storagePage from "./middlewares/storagePage";
import { geoFromHeaders } from "./utils/geo";

const middlewares = [links, storagePage, storageDirectDownload];

const BOT =
  /bot|crawl|spider|slurp|preview|headless|facebookexternalhit|curl|wget|python|go-http|axios|node-fetch|scrapy|okhttp|java\//i;

// Origem no span do request: IP, localização (Vercel), referrer e humano x bot.
// Sem isto os traces do servidor não dizem quem pediu (nem quem usa os links curtos /l, /s, /sd).
function tagRequest(request: NextRequest) {
  const span = trace.getActiveSpan();
  if (!span) return;
  const ua = request.headers.get("user-agent") ?? "";
  const { ip = "", ...geo } = geoFromHeaders(request.headers);
  span.setAttributes({
    "client.address": ip,
    ...Object.fromEntries(Object.entries(geo).map(([k, v]) => [`geo.${k}`, v])),
    "client.kind": !ua || BOT.test(ua) ? "bot" : "human",
    "http.referrer": request.headers.get("referer") ?? "",
  });
}

export async function proxy(request: NextRequest) {
  tagRequest(request);
  for (const config of middlewares) {
    if (config.requestTest(request)) {
      return config.middleware(request);
    }
  }
  return NextResponse.next();
}

// Todas as páginas e APIs (não estáticos): o proxy também marca a origem no span.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|js|css|map|txt|xml|json|pdf)$).*)",
  ],
};
