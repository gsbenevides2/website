import type { NextRequest } from "next/server";
import links from "./middlewares/links";
import storageDirectDownload from "./middlewares/storageDirectDownload";
import storagePage from "./middlewares/storagePage";

const middlewares = [links, storagePage, storageDirectDownload];

export async function middleware(request: NextRequest) {
  for (const config of middlewares) {
    if (config.requestTest(request)) {
      return config.middleware(request);
    }
  }
}

export const config = {
  matcher: ["/l/:id*", "/sd/:id*", "/s/:id*"],
};
