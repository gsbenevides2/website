import axios from "axios";
import { StatusReturn } from "./types";

type AtlassianStatusResponse = {
  status: {
    indicator: "none" | "minor" | "major" | "critical";
  };
};

/**
 * Fetches the status of an endpoint from the status pages made with the Atlassian Statuspage service
 * @param {string} endpoint - The endpoint to fetch the status from
 * @return {Promise<StatusReturn>} - The status of the endpoint
 */
export async function fetchFromAtlassianStatuspage(
  endpoint: string,
): Promise<StatusReturn> {
  const url = `https://${endpoint}/api/v2/status.json`;
  const response = await axios.get<AtlassianStatusResponse>(url);
  return response.data.status.indicator === "none" ? "OK" : "DOWN";
}
