import { registerOTel, OTLPHttpJsonTraceExporter } from "@vercel/otel";
import { SpanStatusCode, trace } from "@opentelemetry/api";

// Org do OpenObserve só deste site. O passcode de ingestão (segredo) vem do env da Vercel.
const ORGANIZATION = process.env.O2_ORGANIZATION ?? "3LaU42nhkPRaMsobEtN0MgyQwCp";
const ENDPOINT =
  process.env.O2_OTLP_ENDPOINT ??
  `https://openobserve.infra.gui.dev.br/api/${ORGANIZATION}/v1/traces`;

export function register() {
  const authorization = process.env.O2_OTLP_AUTHORIZATION;
  registerOTel({
    serviceName: "website-backend",
    // Sem credencial (dev local, preview sem env) mantém só a telemetria padrão da Vercel.
    ...(authorization && {
      traceExporter: new OTLPHttpJsonTraceExporter({
        url: ENDPOINT,
        headers: {
          Authorization: authorization,
          organization: ORGANIZATION,
          "stream-name": "default",
        },
      }),
    }),
  });
}

export function onRequestError(error: unknown) {
  const span = trace.getActiveSpan();
  if (!span) return;
  span.recordException(error instanceof Error ? error : String(error));
  span.setStatus({ code: SpanStatusCode.ERROR });
}
