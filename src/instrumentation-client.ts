import { openobserveLogs } from "@openobserve/browser-logs";
import { openobserveRum } from "@openobserve/browser-rum";

const options = {
  clientToken: process.env.NEXT_PUBLIC_OPENOBSERVE_RUM_CLIENT_TOKEN ?? "",
  applicationId: "my-website",
  site: "openobserve.infra.gui.dev.br",
  service: "my-website",
  env: process.env.NODE_ENV === "production" ? "production" : "development",
  version: "0.1.0",
  organizationIdentifier: "default",
  insecureHTTP: false,
  apiVersion: "v1" as const,
};

openobserveRum.init({
  applicationId: options.applicationId,
  clientToken: options.clientToken,
  site: options.site,
  organizationIdentifier: options.organizationIdentifier,
  service: options.service,
  env: options.env,
  version: options.version,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  apiVersion: options.apiVersion,
  insecureHTTP: options.insecureHTTP,
  defaultPrivacyLevel: "allow",
  sessionSampleRate: 100,
  sessionReplaySampleRate: 50,
});

openobserveLogs.init({
  clientToken: options.clientToken,
  site: options.site,
  organizationIdentifier: options.organizationIdentifier,
  service: options.service,
  env: options.env,
  version: options.version,
  forwardErrorsToLogs: true,
  insecureHTTP: options.insecureHTTP,
  apiVersion: options.apiVersion,
});

openobserveRum.startSessionReplayRecording({ force: true });
