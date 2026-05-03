import { fileToBase64, generateBlur } from "@/utils/imageManager";

export interface ProcessedProjectImage {
  file: File;
  blur: string;
}

export async function processProjectImage(
  imageFile: File
): Promise<ProcessedProjectImage> {
  const base64 = await fileToBase64(imageFile);
  const blur = await generateBlur(base64);

  return {
    file: imageFile,
    blur,
  };
}

export function validateImage(image: File | undefined): void {
  if (!image) {
    throw new Error("Selecione uma Imagem");
  }
}
