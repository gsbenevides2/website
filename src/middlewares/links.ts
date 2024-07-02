import { NextResponse } from "next/server";
import { getLink } from "../services/firebase/adminForEdge/links";
import { MiddlewareConfig } from "./type";

const config: MiddlewareConfig = {
  requestTest: (request) => request.nextUrl.pathname.startsWith("/l/"),
  middleware: async (request) => {
    const id = request.nextUrl.pathname.replace("/l/", "");
    const link = await getLink(id);
    if (!link) return NextResponse.redirect(`${request.nextUrl.origin}/404`);
    return NextResponse.redirect(link.url);
  },
};

export default config;
