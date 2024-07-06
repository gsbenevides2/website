export type StatusReturn = "OK" | "DOWN";
export type Service =
  | {
      name: string;
      endpoint: string;
      statusPage: string;
      fetcher: "incident" | "google" | "atlassian" | "ping";
    }
  | {
      name: string;
      statusPage: string;
      fetcher: "zerotier";
    };

export type ServiceResponse = {
  name: string;
  status: StatusReturn;
  statusPage: string;
};
