import { NextResponse } from "next/server";
import { MiddlewareConfig } from "./type";

const config: MiddlewareConfig = {
  requestTest: (request) => request.nextUrl.pathname.startsWith("/sd/"),
  middleware: async (request) => {
    const id = request.nextUrl.pathname.replace("/sd/", "");
    const newUrl = `${request.nextUrl.origin}/api/storage?id=${id}`;
    return NextResponse.redirect(newUrl);
  },
};

export default config;
