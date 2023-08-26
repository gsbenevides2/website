import { getVideoID } from "ytdl-core";
export function getIframeYoutubeUrl(youtubeUrl: string) {
  const youtubeId = getVideoID(youtubeUrl);
  return `https://www.youtube.com/embed/${youtubeId}`;
}
