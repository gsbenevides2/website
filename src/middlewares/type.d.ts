import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export interface MiddlewareConfig {
  requestTest: (request: NextRequest) => boolean;
  middleware: (request: NextRequest) => Promise<NextResponse>;
}
