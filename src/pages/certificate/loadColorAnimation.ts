import Color from "colorjs.io";
import { useEffect } from "react";

function fetchComputedBackground(): [string, string] {
  const computedStyle = getComputedStyle(document.body);
  const background = computedStyle.background;
  // REGEX to parse the gradient in the format "linear-gradient(270deg, rgb(76, 62, 74) 26.56%, rgb(87, 84, 105) 100%)"
  const gradient = background.match(/linear-gradient\((\d+deg),\s*(rgb\(\d+,\s*\d+,\s*\d+\))\s*(\d+.\d+%),\s*(rgb\(\d+,\s*\d+,\s*\d+\))\s*(\d+.\d+)%\)/);
  if (!gradient) return ["#4c3e4a", "#575469"];
  const colorOne = gradient[2];
  const colorTwo = gradient[4];
  return [colorOne, colorTwo];
}

async function loadColor(to: [string, string], signal: AbortSignal) {
  const from = fetchComputedBackground();
  let backgroundOne = new Color(from[0]);
  let backgroundTwo = new Color(from[1]);
  let rotation = "270deg";
  let distanceOne = "26.56%";
  let distanceTwo = "100%";
  let colorDistanceOne = backgroundOne.distance(to[0]);
  let colorDistanceTwo = backgroundTwo.distance(to[1]);
  let isDiferrent = true;
  // Change the colors slowly to avoid flashing
  while (isDiferrent && !signal.aborted) {
    backgroundOne = backgroundOne.mix(to[0], 0.01);
    backgroundTwo = backgroundTwo.mix(to[1], 0.01);
    colorDistanceOne = backgroundOne.distance(to[0]);
    colorDistanceTwo = backgroundTwo.distance(to[1]);
    isDiferrent = colorDistanceOne > 0.01 || colorDistanceTwo > 0.01;
    document.body.style.background = `linear-gradient(${rotation}, ${backgroundOne.to("srgb")} ${distanceOne}, ${backgroundTwo.to("srgb")} ${distanceTwo})`;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}

declare global {
  interface Window {
    colorManagerController?: AbortController;
  }
}

export default function useLoadColor(colors: [string, string] | undefined, textColor: string | undefined) {
  return useEffect(() => {
    if (!window.colorManagerController) {
      window.colorManagerController = new AbortController();
    } else {
      window.colorManagerController.abort();
      window.colorManagerController = new AbortController();
    }
    if (textColor) window.document.body.style.setProperty("--dynamic-text-color", textColor);

    if (!colors) return;
    loadColor(colors, window.colorManagerController.signal);
    return () => {
      if (textColor) window.document.body.style.removeProperty("--dynamic-text-color");
      if (!window.colorManagerController) return;
      window.colorManagerController.abort();
      window.colorManagerController = new AbortController();
      loadColor(["#4c3e4a", "#575469"], window.colorManagerController.signal);
    };
  }, [colors, textColor]);
}
