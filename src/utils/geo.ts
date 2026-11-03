// IP e localização do visitante.
// gui.dev.br passa pelo Cloudflare, que fica na frente da Vercel: os headers x-vercel-ip-* descrevem o IP que conectou
// à Vercel (a borda do Cloudflare, sempre em São Paulo), não o visitante. Por isso, havendo Cloudflare, vale só cf-*
// (cf-ipcity/região/latitude/longitude exigem o Managed Transform "Add visitor location headers" na zona).
// x-vercel-ip-* fica de reserva para quando não houver Cloudflare (acesso direto ao *.vercel.app, dev).
// Campos vazios são omitidos para não poluir o esquema do OpenObserve.
// O Node lê header como Latin-1 e o Cloudflare manda UTF-8 ("São Paulo" chegaria "SÃ£o Paulo"): reinterpreta os bytes.
const dec = (v: string | null) => {
  if (!v) return "";
  let out = v;
  try {
    out = decodeURIComponent(v);
  } catch {}
  const utf8 = Buffer.from(out, "latin1").toString("utf8");
  return utf8.includes("\uFFFD") ? out : utf8;
};

export function geoFromHeaders(h: Headers): Record<string, string> {
  const get = (name: string) => dec(h.get(name));
  const viaCloudflare = h.has("cf-ray") || h.has("cf-connecting-ip");
  const raw: Record<string, string> = viaCloudflare
    ? {
        ip: get("cf-connecting-ip") || get("true-client-ip"),
        country: get("cf-ipcountry"),
        region: get("cf-region"),
        region_code: get("cf-region-code"),
        city: get("cf-ipcity"),
        latitude: get("cf-iplatitude"),
        longitude: get("cf-iplongitude"),
        continent: get("cf-ipcontinent"),
        timezone: get("cf-timezone"),
        postal_code: get("cf-postal-code"),
      }
    : {
        ip: get("x-real-ip") || (h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? ""),
        country: get("x-vercel-ip-country"),
        region_code: get("x-vercel-ip-country-region"),
        city: get("x-vercel-ip-city"),
        latitude: get("x-vercel-ip-latitude"),
        longitude: get("x-vercel-ip-longitude"),
        continent: get("x-vercel-ip-continent"),
        timezone: get("x-vercel-ip-timezone"),
        postal_code: get("x-vercel-ip-postal-code"),
      };
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v));
}
