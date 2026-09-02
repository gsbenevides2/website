import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_MONEAT_DSN,
      tracesSampleRate: 1,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
