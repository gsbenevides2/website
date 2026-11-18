// Quais destinos de telemetria estão ativos neste build. Usado pelo aviso (TelemetryNotice) para só aparecer
// quando há de fato coleta a avisar, e pela página /telemetria para descrever o que está ligado.
export type TelemetryTargets = {
  // GTM/GA4: o contêiner GTM-NW5NDZP2 está fixo no _app, então sempre existe.
  gtm: boolean;
  // RUM + logs do navegador no OpenObserve: depende do token público presente no build (ver instrumentation-client.ts).
  rum: boolean;
  // Vercel Analytics e Speed Insights: também fixos no _app.
  vercel: boolean;
};

export function telemetryTargets(): TelemetryTargets {
  return {
    gtm: true,
    rum: Boolean(process.env.NEXT_PUBLIC_O2_RUM_TOKEN),
    vercel: true,
  };
}

export function hasTelemetry(): boolean {
  const targets = telemetryTargets();
  return targets.gtm || targets.rum || targets.vercel;
}
