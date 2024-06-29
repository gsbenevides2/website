import { ContentfulLivePreview } from "@contentful/live-preview";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Entry, EntrySkeletonType } from "contentful";
import { useMemo } from "react";
import { getCMSClient } from "./getClient";
import { CMSData } from "./types";

export type MinecraftFields = {
  type: "Bedrock" | "Java";
  ip: string;
  port: number;
  helperText: string;
};
export const MINECRAFT_PAGE_CONTENT_TYPE = "minecraft";
export type MinecraftFieldsName = keyof MinecraftFields;
export type MinecraftCMSEntry = EntrySkeletonType<MinecraftFields>;
export type MinecraftEntry = Entry<MinecraftCMSEntry, undefined, string>;
export type MinecraftCMSProps = {
  [key in MinecraftFieldsName]: InspectorModeTags | {};
};
export type MinecraftUseCMSData = {
  entry: MinecraftEntry;
  fields: MinecraftFields;
  props: MinecraftCMSProps;
};
export type MinecraftCMSData = CMSData<MinecraftCMSEntry>;

export const getCMSDataForMinecraftPage = async (preview: boolean): Promise<MinecraftCMSData> => {
  const client = getCMSClient(preview);
  const entries = await client.getEntries<MinecraftCMSEntry>({
    content_type: MINECRAFT_PAGE_CONTENT_TYPE,
  });
  return {
    entries,
    locale: "pt-BR",
    isPreview: preview,
  };
};

export const useCMSDataForMinecraftPage = (cmsData: MinecraftCMSData): MinecraftUseCMSData => {
  ContentfulLivePreview.init({
    locale: cmsData.locale,
  });
  const updatedEntries = useContentfulLiveUpdates(cmsData.entries);
  const entry = useMemo(() => {
    if (typeof window === "undefined") {
      return updatedEntries.items[0];
    }
    const qs = new URLSearchParams(window.location.search);
    const entryId: string | null = qs.get("entryId");
    if (entryId) {
      return updatedEntries.items.find((item) => item.sys.id === entryId) ?? updatedEntries.items[0];
    }
    return updatedEntries.items[0];
  }, [updatedEntries.items]);
  const props: MinecraftCMSProps = {
    type: {},
    ip: {},
    port: {},
    helperText: {},
  };
  const entryFields = Object.keys(entry.fields) as MinecraftFieldsName[];
  if (cmsData.isPreview) {
    const entryId = entry.sys.id;
    entryFields.forEach((field) => {
      props[field] = ContentfulLivePreview.getProps({
        entryId,
        fieldId: field,
      });
    });
  }

  return {
    entry,
    fields: entry.fields,
    props,
  };
};
