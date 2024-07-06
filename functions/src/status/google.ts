import axios from "axios";
import { StatusReturn } from "./types";

type IncidentsResponse = Array<{
  most_recent_update: {
    status: string;
  };
}>;

/**
 * Fetches the status of an endpoint from the status pages made with the Google Service Dashboard service
 * @param {string} endpoint - The endpoint to fetch the status from
 * @return {Promise<StatusReturn>} - The status of the endpoint
 */
export async function fetchFromGoogleCloudStatusDashboard(
  endpoint: string,
): Promise<StatusReturn> {
  const url = `https://${endpoint}/incidents.json`;
  const response = await axios.get<IncidentsResponse>(url);
  return response.data.every(
    (incident) =>
      incident.most_recent_update.status.toLocaleLowerCase() !== "available",
  )
    ? "DOWN"
    : "OK";
}
