import { fileToBase64, generateBlur } from "@/utils/imageManager";

export interface Asset {
  altText: string;
  file: File;
}

export interface GeneratedAsset {
  alt: string;
  blur: string;
  name: string;
  type: string;
  file: File;
}

export async function generateAssets(
  assets: Asset[],
): Promise<GeneratedAsset[]> {
  const generatedAssets: GeneratedAsset[] = [];
  for (const asset of assets) {
    const base64 = await fileToBase64(asset.file);
    const blur = await generateBlur(base64);
    generatedAssets.push({
      alt: asset.altText,
      blur,
      name: asset.file.name,
      type: asset.file.type,
      file: asset.file,
    });
  }
  return generatedAssets;
}
