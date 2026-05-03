import { getColorsOfImageAndText } from "@/utils/color";
import { generateBlur } from "@/utils/imageManager";
import { pdf2Img, pdfSize } from "@/utils/pdf";

export interface ProcessedCertificate {
  pdf: {
    file: File;
    height: number;
    width: number;
  };
  colors: Awaited<ReturnType<typeof getColorsOfImageAndText>>;
  thumbnail: {
    png: string;
    blur: string;
  };
}

export async function processCertificatePdf(
  pdfFile: File,
): Promise<ProcessedCertificate> {
  const pdfThumbnail = await pdf2Img(pdfFile);
  const sizes = await pdfSize(pdfFile);

  return {
    pdf: {
      file: pdfFile,
      height: parseInt(sizes.height.toString()),
      width: parseInt(sizes.width.toString()),
    },
    colors: await getColorsOfImageAndText(pdfThumbnail),
    thumbnail: {
      png: pdfThumbnail,
      blur: await generateBlur(pdfThumbnail),
    },
  };
}

export function validatePdf(pdf: File | undefined): void {
  if (!pdf) {
    throw new Error("Selecione um PDF");
  }
}
