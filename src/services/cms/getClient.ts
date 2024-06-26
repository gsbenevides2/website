import { createClient } from "contentful";

export const getCMSClient = (preview: boolean) => {
  const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  } = process.env;

  const accessToken = preview
    ? CONTENTFUL_PREVIEW_ACCESS_TOKEN || ""
    : CONTENTFUL_ACCESS_TOKEN || "";

  const clientHost = preview ? "preview.contentful.com" : "cdn.contentful.com";
  const client = createClient({
    host: clientHost,
    space: CONTENTFUL_SPACE_ID || "",
    environment: "master",
    accessToken: accessToken,
  });
  return client;
};
