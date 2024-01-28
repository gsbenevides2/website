export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API not available");
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    throw new Error("Failed to copy: " + err);
  }
}
