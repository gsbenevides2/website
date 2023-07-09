declare class Jimp {
  static read(image: string): Promise<Jimp>;
  static MIME_JPEG: string;
  static MIME_PNG: string;
  static AUTO: string;
  scale(factor: number): Jimp;
  blur(radius: number): Jimp;
  getBase64Async(mime: string): Promise<string>;
  writeAsync(path: string): Promise<void>;
  resize(width: number, height: number): Jimp;
  getWidth(): number;
  getHeight(): number;
}

export const getMimeType = (base64: string) => {
  const regex = /^data:(.+);base64,(.*)$/;
  const matches = base64.match(regex);
  if (!matches) return false;
  return matches[1];
};

export const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      if (typeof base64data === "string") resolve(base64data);
      else reject("Invalid base64 data");
    };
  });
};

export const blobUrlToBase64 = async (blobUrl: string) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return await blobToBase64(blob);
};

export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result;
      if (typeof base64data === "string") resolve(base64data);
      else reject("Invalid base64 data");
    };
  });
};

export const base64ToFile = (base64: string, fileName: string) => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/);
  if (!mime) throw new Error("Invalid base64 data");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime[1] });
};

export const generateBlur = async (base64Input: string) => {
  const inputType = getMimeType(base64Input);
  if (!inputType) throw new Error("Invalid input type");

  const image = await Jimp.read(base64Input);
  return await image.resize(32, 32).blur(5).getBase64Async(Jimp.MIME_PNG);
};

interface Size {
  width: number;
  height: number;
}

export async function getSizeOfImage(base64Input: string): Promise<Size> {
  const inputType = getMimeType(base64Input);
  if (!inputType) throw new Error("Invalid input type");

  const image = await Jimp.read(base64Input);
  return {
    width: image.getWidth(),
    height: image.getHeight(),
  };
}

export async function resizeImage(
  base64Input: string,
  size: Size
): Promise<string> {
  let fileType = getMimeType(base64Input);
  if (!fileType) throw new Error("Invalid input type");

  const lenna = await Jimp.read(base64Input);
  const base64Output = await lenna
    .resize(size.width, size.height)
    .getBase64Async(fileType);
  return base64Output;
}

const convertToWebp = async (base64: string): Promise<string> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Invalid context");
  const image = new Image();
  image.src = base64;
  await new Promise<void>((resolve) => {
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      resolve();
    };
  });
  return canvas.toDataURL("image/webp");
};

export async function convertImageToWebP(base64: string): Promise<string> {
  const inputType = getMimeType(base64);
  if (!inputType) throw new Error("Invalid input type");
  if (inputType === "image/webp") return base64;
  const output = await convertToWebp(base64);
  return output;
}
