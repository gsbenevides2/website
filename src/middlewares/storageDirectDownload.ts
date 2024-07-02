import { getStorage } from "@/services/firebase/adminForEdge/storage";
import { getServerUrl } from "@/services/firebase/client/selfstorage";
import { NextResponse } from "next/server";
import { MiddlewareConfig } from "./type";

const config: MiddlewareConfig = {
  requestTest: (request) => request.nextUrl.pathname.startsWith("/s/d/"),
  middleware: async (request) => {
    const id = request.nextUrl.pathname.replace("/s/d/", "");
    const info = await getStorage(id);
    if (!info) return NextResponse.redirect(`${request.nextUrl.origin}/404`);
    if (!info.visible) {
      const url = `/storage/${id}`;
      return NextResponse.redirect(`${request.nextUrl.origin}${url}`);
    }
    const url = `${getServerUrl()}/file/${id}`;
    return NextResponse.redirect(url);
  },
};

export default config;
