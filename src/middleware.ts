import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/l/")) {
    const id = request.nextUrl.pathname.replace("/l/", "");
    const redUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5001/gui-dev-br/us-central1/links"
        : "https://links.functions.gui.dev.br";
    const origem =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://gui.dev.br";
    const makeUrl = `${redUrl}/${id}?origem=${origem}`;
    return NextResponse.redirect(makeUrl);
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/l/:id*",
};
