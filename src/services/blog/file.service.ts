export async function downloadFile(
  url: string,
  name: string,
  type: string,
): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], name, { type });
  return file;
}
