import { registerOTel, OTLPHttpJsonTraceExporter } from "@vercel/otel";
import { SpanStatusCode, trace } from "@opentelemetry/api";

export function register() {
  registerOTel({
    serviceName: "my-website",
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: process.env.OPENOBSERVE_OTLP_ENDPOINT,
      headers: {
        Authorization: process.env.OPENOBSERVE_OTLP_AUTHORIZATION,
        organization: process.env.OPENOBSERVE_ORGANIZATION,
        "stream-name": process.env.OPENOBSERVE_STREAM_NAME,
      },
    }),
  });
}

export function onRequestError(error: unknown) {
  const span = trace.getActiveSpan();
  if (!span) return;
  span.recordException(error instanceof Error ? error : String(error));
  span.setStatus({ code: SpanStatusCode.ERROR });
}
