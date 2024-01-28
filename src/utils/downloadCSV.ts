import { downloadFile } from "./downloadFile";

export function downloadCSV(content: string, fileName: string): void {
  const blob = new Blob([content], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  downloadFile(url, fileName);
}
