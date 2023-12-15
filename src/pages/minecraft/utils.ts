export function downloadCSV(content: string, fileName: string): void {
  const blob = new Blob([content], { type: "text/csv" });

  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  // Limpa a URL criada
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
