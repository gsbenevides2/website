import { openobserveRum } from "@openobserve/browser-rum";

type Params = Record<string, string | number | boolean>;
type DataLayerEvent = { event?: unknown; [key: string]: unknown };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

// Caminho único: todo evento vai para o dataLayer (o GTM/GA4 já escuta) e daqui o espelho manda o mesmo evento ao RUM.
export function track(event: string, params: Params = {}) {
  (window.dataLayer = window.dataLayer ?? []).push({ event, ...params });
}

const toParams = (data: DataLayerEvent): Params =>
  Object.fromEntries(
    Object.entries(data)
      .filter(([k, v]) => k !== "event" && ["string", "number", "boolean"].includes(typeof v))
      .map(([k, v]) => [k, v as string | number | boolean]),
  );

// Espelha no OpenObserve RUM tudo o que vai ao dataLayer (GTM/GA4), exceto os eventos internos gtm.*.
// O RUM fica com os mesmos eventos do GA: ação `custom`, ligada à sessão, origem, localização e replay.
export function mirrorDataLayer() {
  const layer = (window.dataLayer = window.dataLayer ?? []);
  const forward = (item: unknown) => {
    if (!item || typeof item !== "object") return;
    const { event } = item as DataLayerEvent;
    if (typeof event !== "string" || event.startsWith("gtm.")) return;
    try {
      openobserveRum.addAction(event, toParams(item as DataLayerEvent));
    } catch {
      // telemetria nunca derruba a página
    }
  };
  layer.forEach(forward);
  const push = layer.push.bind(layer);
  layer.push = (...items: DataLayerEvent[]) => {
    items.forEach(forward);
    return push(...items);
  };
}

// Cliques delegados no document, sem tocar em cada componente:
//  - <a>: link externo vira `outbound_click`; interno vira `nav_click`; ambos com a seção de origem.
//  - [data-ga="evento"] (+ data-ga-label): botão simples sem estado.
export function trackClicks() {
  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    const tagged = target?.closest<HTMLElement>("[data-ga]");
    if (tagged) {
      return track(tagged.dataset.ga!, {
        label: tagged.dataset.gaLabel ?? tagged.getAttribute("aria-label") ?? "",
      });
    }
    const a = target?.closest("a[href]");
    if (!a) return;
    let url: URL;
    try {
      url = new URL(a.getAttribute("href")!, location.href);
    } catch {
      return;
    }
    if (!/^https?:$/.test(url.protocol) && url.protocol !== "mailto:" && url.protocol !== "tel:") return;
    const external = url.origin !== location.origin;
    track(external ? "outbound_click" : "nav_click", {
      link_url: external ? url.href : url.pathname + url.hash,
      ...(external && { link_domain: url.hostname || url.protocol }),
      link_text: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 100),
      section:
        a.closest("[id]")?.id ||
        a.closest("header,footer,dialog,nav")?.tagName.toLowerCase() ||
        "page",
    });
  });
}
