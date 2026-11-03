import { openobserveLogs } from "@openobserve/browser-logs";
import { openobserveRum } from "@openobserve/browser-rum";
import { acquisition } from "@/utils/acquisition";
import { mirrorDataLayer, trackClicks } from "@/utils/track";
import packageJson from "../package.json";

// Org do OpenObserve só deste site; o token é o RUM client token (público) dela. Sem token (dev local) o RUM não liga.
const ORGANIZATION =
  process.env.NEXT_PUBLIC_O2_ORGANIZATION ?? "3LaU42nhkPRaMsobEtN0MgyQwCp";
const CLIENT_TOKEN = process.env.NEXT_PUBLIC_O2_RUM_TOKEN;

// Eventos (outbound_click, nav_click, data-ga) vão ao dataLayer em qualquer caso: o GTM/GA4 continua recebendo.
trackClicks();

// IP e localização (Vercel, via /geo). Com timeout: sem ele o RUM sobe sem geo em vez de atrasar.
async function geo(): Promise<Record<string, string>> {
  try {
    const r = await fetch("/geo", {
      cache: "no-store",
      signal: AbortSignal.timeout(1000),
    });
    return (await r.json()) as Record<string, string>;
  } catch {
    return {};
  }
}

async function instrument() {
  if (!CLIENT_TOKEN) return;
  const service = "website-web";
  const env = process.env.NODE_ENV === "production" ? "production" : "development";
  const shared = {
    clientToken: CLIENT_TOKEN,
    site: "openobserve.infra.gui.dev.br",
    organizationIdentifier: ORGANIZATION,
    service,
    env,
    version: packageJson.version,
    insecureHTTP: false,
    apiVersion: "v1" as const,
  };
  // Resolvido ANTES do init: a view inicial já sai com origem e localização.
  const ctx = { ...acquisition(), ...(await geo()) };

  openobserveRum.init({
    ...shared,
    applicationId: service,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    defaultPrivacyLevel: "mask-user-input",
    sessionPersistence: "local-storage", // navegação/reload mantém a sessão (sem cookie); expira por inatividade
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackingConsent: "granted",
  });
  // Contexto em TODO evento do RUM: origem da visita, IP e localização. Permite cruzar origem x comportamento.
  for (const [k, v] of Object.entries(ctx)) openobserveRum.setGlobalContextProperty(k, v);

  openobserveLogs.init({ ...shared, forwardErrorsToLogs: true });
  openobserveRum.startSessionReplayRecording({ force: true });
  // Mesmos eventos que vão ao GA/GTM, agora também no OpenObserve.
  mirrorDataLayer();
}

instrument().catch((error) => console.error("RUM não inicializou", error));
