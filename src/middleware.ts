import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getLink } from "./services/firebase/adminForEdge/links";
import { getStorage } from "./services/firebase/adminForEdge/storage";

const serverUrl = process.env.NODE_ENV === "production" ? "https://storage.selfhost.gui.dev.br" : "http://localhost:8087";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/l/")) {
    const id = request.nextUrl.pathname.replace("/l/", "");
    const link = await getLink(id);
    if (!link) return NextResponse.redirect(`${request.nextUrl.origin}/404`);
    return NextResponse.redirect(link.url);
  }
  if (request.nextUrl.pathname.startsWith("/s/d/")) {
    const id = request.nextUrl.pathname.replace("/s/d/", "");
    const info = await getStorage(id);
    if (!info) return NextResponse.redirect(`${request.nextUrl.origin}/404`);
    if (!info.visible) {
      const url = `/storage/${id}`;
      return NextResponse.redirect(`${request.nextUrl.origin}${url}`);
    }
    const url = `${serverUrl}/file/${id}`;
    return NextResponse.redirect(url);
  }
  if (request.nextUrl.pathname.startsWith("/s/")) {
    const id = request.nextUrl.pathname.replace("/s/", "");
    return NextResponse.redirect(`${request.nextUrl.origin}/storage/${id}`);
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/l/:id*", "/s/d/:id*", "/s/:id*"],
};
