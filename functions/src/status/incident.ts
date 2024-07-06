import axios from "axios";
import { StatusReturn } from "./types";

type IncidentIoStatusResponse = {
  summary: {
    affected_components: Array<unknown>;
  };
};

/**
 * Fetches the status of an endpoint from the status pages made with the Incident.io service
 * @param {string} endpoint - The endpoint to fetch the status from
 * @return {Promise<StatusReturn>} - The status of the endpoint
 */
export async function fetchFromIncidentIoStatus(
  endpoint: string,
): Promise<StatusReturn> {
  const url = `https://${endpoint}/proxy/${endpoint}`;
  const response = await axios.get<IncidentIoStatusResponse>(url);
  return response.data.summary.affected_components.length > 0 ? "DOWN" : "OK";
}
