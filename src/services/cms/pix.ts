import { ContentfulLivePreview } from "@contentful/live-preview";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Entry, EntrySkeletonType } from "contentful";
import { useMemo } from "react";
import { getCMSClient } from "./getClient";
import { CMSData, RichTextContent } from "./types";

export type PixFields = {
  email: string;
  qrCode: string;
  accountInformation: RichTextContent;
  warnings: RichTextContent;
};

export type PixFieldsName = keyof PixFields;
export type PixCMSEntry = EntrySkeletonType<PixFields>;
export type PixEntry = Entry<PixCMSEntry, undefined, string>;
export type PixCMSProps = {
  [key in PixFieldsName]: InspectorModeTags | {};
};

export type PixUseCMSData = {
  entry: PixEntry;
  fields: PixFields;
  props: PixCMSProps;
};

export type PixCMSData = CMSData<PixCMSEntry>;

export const PIX_PAGE_CONTENT_TYPE = "pix";

export const getCMSDataForPixPage = async (preview: boolean): Promise<PixCMSData> => {
  const client = getCMSClient(preview);
  const entries = await client.getEntries<PixCMSEntry>({
    content_type: PIX_PAGE_CONTENT_TYPE,
  });
  return {
    entries,
    locale: "pt-BR",
    isPreview: preview,
  };
};

export const useCMSDataForPixPage = (cmsData: PixCMSData): PixUseCMSData => {
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
  const props: PixCMSProps = {
    email: {},
    qrCode: {},
    accountInformation: {},
    warnings: {},
  };
  const entryFields = Object.keys(entry.fields) as PixFieldsName[];
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
