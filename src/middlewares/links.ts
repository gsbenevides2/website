import { NextResponse } from "next/server";
import { MiddlewareConfig } from "./type";

const config: MiddlewareConfig = {
  requestTest: (request) => request.nextUrl.pathname.startsWith("/l/"),
  middleware: async (request) => {
    const id = request.nextUrl.pathname.replace("/l/", "");
    const newUrl = `${request.nextUrl.origin}/api/links?linkId=${id}`;
    return NextResponse.redirect(newUrl);
  },
};

export default config;
