import axios from "axios";
import { StatusReturn } from "./types";

type ZerotierStatusResponse = {
  heartbeatList: Record<
    string,
    Array<{
      status: 0 | 1;
    }>
  >;
};

/**
 * Fetches the status of the ZeroTier service from the status page made by ZeroTier
 * @return {Promise<StatusReturn>} - The status of the ZeroTier service
 */
export async function fetchFromZerotierStatuspage(): Promise<StatusReturn> {
  const url = "https://status.zerotier.com/api/status-page/heartbeat/zerotier";
  const response = await axios.get<ZerotierStatusResponse>(url);
  const values = Object.values(response.data.heartbeatList);
  const hasOneServiceDown = values.some((services) =>
    services.every((service) => service.status === 0),
  );
  return hasOneServiceDown ? "DOWN" : "OK";
}
