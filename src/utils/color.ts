import { extractColors } from "extract-colors";
import getSimilarColor from "get-similar-color";
import Vibrant from "node-vibrant";

export function pickTextColorBasedOnBgColorSimple(bgColor: string): "black" | "white" {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
}

export function isWhiteOrBlackColor(color: string): boolean {
  const similarToBlack = getSimilarColor({
    colorArray: [{ name: "black", hex: "#000000" }],
    targetColor: color,
    similarityThreshold: 0.5,
  });
  const blackSimilarity = similarToBlack?.similarity ?? 0;
  if (blackSimilarity >= 0.9) {
    return true;
  }
  const similarToWhite = getSimilarColor({
    colorArray: [{ name: "white", hex: "#ffffff" }],
    targetColor: color,
    similarityThreshold: 0.5,
  });

  const whiteSimilarity = similarToWhite?.similarity ?? 0;
  if (whiteSimilarity >= 0.9) {
    return true;
  }
  return false;
}

export async function getColorsOfImageAndText(imageUrl: string): Promise<{
  gradient: [string, string];
  text: "black" | "white";
}> {
  const vibrant = Vibrant.from(imageUrl);
  const palette = await vibrant.getPalette();
  const firstColor = palette.DarkVibrant?.hex;
  if (!firstColor) throw new Error("No color found");
  const extractedColors = await extractColors(imageUrl, {
    distance: 0,
    hueDistance: 0,
    pixels: 64000,
    lightnessDistance: 0,
    saturationDistance: 0,
  });

  const findedColor = getSimilarColor({
    colorArray: extractedColors
      .map((color) => ({
        name: color.hex,
        hex: color.hex,
      }))
      .filter((color) => color.hex !== firstColor),
    targetColor: firstColor,
    similarityThreshold: 0.5,
  });

  return {
    gradient: [firstColor, findedColor?.hex ?? firstColor],
    text: pickTextColorBasedOnBgColorSimple(firstColor),
  };
}
