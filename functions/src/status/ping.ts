import axios from "axios";
import { StatusReturn } from "./types";

/**
 * Fetch the status of endpoint making a ping request
 * @param {string} endpoint - The endpoint to fetch the status from
 * @return {Promise<StatusReturn>} - The status of the endpoint
 */
export async function fetchFromPing(endpoint: string): Promise<StatusReturn> {
  const url = `https://${endpoint}`;
  const response = await axios
    .get(url, { timeout: 5000 })
    .catch((reason) => reason.response);
  const validStatus = [200, 401];
  if (!response) return "DOWN";
  return validStatus.includes(response.status) ? "OK" : "DOWN";
}
