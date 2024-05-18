import { Entry, EntrySkeletonType } from "contentful";
import { CMSData } from "./types";
import { getCMSClient } from "./getClient";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useMemo } from "react";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";

export type EnabledLinkName = "courses" | "projects" | "social" | "blog";
export type AboutFields = {
  enabledLinks: Array<EnabledLinkName>;
  textDesktop: string;
  textMobile: string;
};

export type AboutFieldsName = keyof AboutFields;

export type AboutCMSEntry = EntrySkeletonType<AboutFields>;
export type AboutEntry = Entry<AboutCMSEntry, undefined, string>;
export type AboutCMSProps = {
  [key in AboutFieldsName]: InspectorModeTags | {};
};

export type AboutUseCMSData = {
  entry: AboutEntry;
  fields: AboutFields;
  props: AboutCMSProps;
};

export type AboutCMSData = CMSData<AboutCMSEntry>;

export const ABOUT_PAGE_CONTENT_TYPE = "about";

export const getCMSDataForAboutPage = async (
  preview: boolean
): Promise<AboutCMSData> => {
  const client = getCMSClient(preview);
  const entries = await client.getEntries<AboutCMSEntry>({
    content_type: ABOUT_PAGE_CONTENT_TYPE,
  });
  return {
    entries,
    locale: "pt-BR",
    isPreview: preview,
  };
};

export const useCMSDataForAboutPage = (
  cmsData: AboutCMSData
): AboutUseCMSData => {
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
      return (
        updatedEntries.items.find((item) => item.sys.id === entryId) ??
        updatedEntries.items[0]
      );
    }
    return updatedEntries.items[0];
  }, [updatedEntries.items]);
  const props: AboutCMSProps = {
    enabledLinks: {},
    textDesktop: {},
    textMobile: {},
  };
  const entryFields = Object.keys(entry.fields) as AboutFieldsName[];
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
