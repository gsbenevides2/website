import { NextResponse } from "next/server";
import { MiddlewareConfig } from "./type";

const config: MiddlewareConfig = {
  requestTest: (request) => request.nextUrl.pathname.startsWith("/s/"),
  middleware: async (request) => {
    const id = request.nextUrl.pathname.replace("/s/", "");
    return NextResponse.redirect(`${request.nextUrl.origin}/storage/${id}`);
  },
};

export default config;
