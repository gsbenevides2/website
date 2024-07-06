import * as cors from "cors";
import * as express from "express";
import { fetchFromAtlassianStatuspage } from "./atlasian";
import { fetchFromGoogleCloudStatusDashboard } from "./google";
import { fetchFromIncidentIoStatus } from "./incident";
import { fetchFromPing } from "./ping";
import { Service, ServiceResponse } from "./types";
import { fetchFromZerotierStatuspage } from "./zerotier";
const app = express();
app.use(cors());
const services: Service[] = [
  {
    name: "GitHub",
    endpoint: "www.githubstatus.com",
    statusPage: "https://www.githubstatus.com/",
    fetcher: "atlassian",
  },
  {
    name: "NPM",
    endpoint: "status.npmjs.org",
    statusPage: "https://status.npmjs.org/",
    fetcher: "atlassian",
  },
  {
    name: "Vercel",
    endpoint: "www.vercel-status.com",
    statusPage: "https://www.vercel-status.com/",
    fetcher: "atlassian",
  },
  {
    name: "Cloudflare",
    endpoint: "www.cloudflarestatus.com",
    statusPage: "https://www.cloudflarestatus.com/",
    fetcher: "atlassian",
  },
  {
    name: "VTEX",
    endpoint: "status.vtex.com",
    statusPage: "https://status.vtex.com/",
    fetcher: "incident",
  },
  {
    name: "Google Cloud",
    endpoint: "status.cloud.google.com",
    statusPage: "https://status.cloud.google.com/",
    fetcher: "google",
  },
  {
    name: "Firebase",
    endpoint: "status.firebase.google.com",
    statusPage: "https://status.firebase.google.com/",
    fetcher: "google",
  },
  {
    name: "Google Workspace",
    endpoint: "www.google.com/appsstatus/dashboard",
    statusPage: "https://www.google.com/appsstatus/dashboard",
    fetcher: "google",
  },
  {
    name: "Zerotier",
    statusPage: "https://status.zerotier.com/",
    fetcher: "zerotier",
  },
  {
    name: "Traefik",
    endpoint: "traefik.selfhost.gui.dev.br/dashboard/#/",
    statusPage: "https://traefik.selfhost.gui.dev.br/dashboard/#/",
    fetcher: "ping",
  },
  {
    name: "Pihole",
    endpoint: "pihole.selfhost.gui.dev.br/admin/",
    statusPage: "https://pihole.selfhost.gui.dev.br/admin/",
    fetcher: "ping",
  },
  {
    name: "Portainer",
    endpoint: "portainer.selfhost.gui.dev.br",
    statusPage: "https://portainer.selfhost.gui.dev.br",
    fetcher: "ping",
  },
  {
    name: "Cockpit",
    endpoint: "cockpit.selfhost.gui.dev.br",
    statusPage: "https://cockpit.selfhost.gui.dev.br",
    fetcher: "ping",
  },
  {
    name: "Coolify",
    endpoint: "selfhost.gui.dev.br",
    statusPage: "https://selfhost.gui.dev.br",
    fetcher: "ping",
  },
  {
    name: "Tarefy",
    endpoint: "app.tarefy.com",
    statusPage: "https://app.tarefy.com",
    fetcher: "ping",
  },
];
/**
 * Fetches the status of a service
 * @param {Service} service  - The service to fetch the status from
 * @return {Promise<ServiceResponse>} - The status of the service
 */
async function fetchStatusFromService(
  service: Service,
): Promise<ServiceResponse> {
  const servicesFunctions = {
    incident: fetchFromIncidentIoStatus,
    google: fetchFromGoogleCloudStatusDashboard,
    atlassian: fetchFromAtlassianStatuspage,
    zerotier: fetchFromZerotierStatuspage,
    ping: fetchFromPing,
  };
  if (!servicesFunctions[service.fetcher]) throw new Error("Invalid fetcher");
  if ("endpoint" in service) {
    const status = await servicesFunctions[service.fetcher](service.endpoint);
    return {
      name: service.name,
      status,
      statusPage: service.statusPage,
    };
  }
  const status = await servicesFunctions[service.fetcher]();
  return {
    name: service.name,
    status,
    statusPage: service.statusPage,
  };
}
/**
 * Fetches the status of all services
 * @return {Promise<ServiceResponse[]>} - The status of all services
 */
async function fetchStatusFromAllServices(): Promise<ServiceResponse[]> {
  const statusPromises = services.map(fetchStatusFromService);
  return await Promise.all(statusPromises);
}

app.get("/", async (_req, res) => {
  res.json(await fetchStatusFromAllServices());
});

export const statusMiddleware = app;
