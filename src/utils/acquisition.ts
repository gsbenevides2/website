// Origem da visita (first-touch da aba): UTMs ou domínio do referrer, classificado em medium.
// Guardada no sessionStorage para toda navegação interna carregar a mesma origem.
const KEY = "web_acq";
const SEARCH =
  /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave|baidu|yandex)\./;
const SOCIAL =
  /(^|\.)(t\.co|twitter|x\.com|facebook|instagram|reddit|youtube|youtu\.be|discord|tiktok|whatsapp|telegram|linkedin|lnkd\.in|github|bsky)\b/;

export type Acquisition = {
  acq_source: string;
  acq_medium: string;
  acq_campaign: string;
  acq_referrer: string;
  acq_landing: string;
};

export function acquisition(): Acquisition {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved) as Acquisition;
  } catch {}
  const q = new URLSearchParams(location.search);
  let host = "";
  try {
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.origin !== location.origin) host = r.hostname.replace(/^www\./, "");
    }
  } catch {}
  const medium =
    q.get("utm_medium") ||
    (!host
      ? "none"
      : SEARCH.test(host)
        ? "organic"
        : SOCIAL.test(host)
          ? "social"
          : "referral");
  const acq: Acquisition = {
    acq_source: q.get("utm_source") || host || "direct",
    acq_medium: medium,
    acq_campaign: q.get("utm_campaign") ?? "",
    acq_referrer: host,
    acq_landing: location.pathname,
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(acq));
  } catch {}
  return acq;
}
