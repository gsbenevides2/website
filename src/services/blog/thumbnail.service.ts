import {
  base64ToFile,
  convertImageToWebP,
  fileToBase64,
  generateBlur,
  getMimeType,
  getSizeOfImage,
  resizeImage,
} from "@/utils/imageManager";

export interface GeneratedThumbnails {
  originalPng: File;
  originalWebp: File;
  metaTag: File;
  list: File;
  blur: string;
}

export async function verifyThumbnails(original: File): Promise<boolean> {
  const base64 = await fileToBase64(original);
  const fileType = getMimeType(base64);
  if (fileType !== "image/png") return false;
  const sizes = await getSizeOfImage(base64);
  if (sizes.width !== 1000) return false;
  if (sizes.height !== 667) return false;
  return true;
}

export async function generateBlogThumbnails(
  original: File,
): Promise<GeneratedThumbnails> {
  const originalPng = original;
  const base64Original = await fileToBase64(original);
  const webpOriginalBase64 = await convertImageToWebP(base64Original);
  const originalWebp = base64ToFile(webpOriginalBase64, "original.webp");
  const metaTagBase64 = await resizeImage(base64Original, {
    width: 500,
    height: 334,
  });
  const metaTag = base64ToFile(metaTagBase64, "metaTag.png");
  const listBase64 = await convertImageToWebP(metaTagBase64);
  const list = base64ToFile(listBase64, "list.webp");
  const blur = await generateBlur(base64Original);
  return {
    originalPng,
    originalWebp,
    metaTag,
    list,
    blur,
  };
}

export function validateThumbnail(thumbnail: File | undefined): void {
  if (!thumbnail) {
    throw new Error("Selecione uma imagem para thumbnail");
  }
}

export async function validateThumbnailFormat(thumbnail: File): Promise<void> {
  if (!(await verifyThumbnails(thumbnail))) {
    throw new Error("A imagem da thumbnail deve ser PNG e ter 1000x667");
  }
}
