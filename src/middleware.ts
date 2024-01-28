import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLink } from "./services/firebase/admin/links";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/l/")) {
    const id = request.nextUrl.pathname.replace("/l/", "");
    try {
      const link = await getLink(id);
      if (!link) return NextResponse.redirect(new URL("/404", request.url));
      return NextResponse.redirect(link.url);
    } catch (e: any) {
      NextResponse.redirect(new URL("/500", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/l/:id*",
};

