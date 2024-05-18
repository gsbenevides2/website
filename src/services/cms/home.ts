import { Entry, EntrySkeletonType } from "contentful";
import { CMSData } from "./types";
import { getCMSClient } from "./getClient";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useMemo } from "react";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";

export type HomeFields = {
  title: string;
  buttonText: string;
};

export type HomeFieldsName = keyof HomeFields;

export type HomeCMSEntry = EntrySkeletonType<HomeFields>;
export type HomeEntry = Entry<HomeCMSEntry, undefined, string>;
export type HomeCMSProps = {
  [key in HomeFieldsName]: InspectorModeTags | {};
};

export type HomeUseCMSData = {
  entry: HomeEntry;
  fields: HomeFields;
  props: HomeCMSProps;
};

export type HomeCMSData = CMSData<HomeCMSEntry>;

export const HOME_PAGE_CONTENT_TYPE = "homePage";

export const getCMSDataForHomePage = async (
  preview: boolean
): Promise<HomeCMSData> => {
  const client = getCMSClient(preview);
  const entries = await client.getEntries<HomeCMSEntry>({
    content_type: HOME_PAGE_CONTENT_TYPE,
  });
  return {
    entries,
    locale: "pt-BR",
    isPreview: preview,
  };
};

export const useCMSDataForHomePage = (cmsData: HomeCMSData): HomeUseCMSData => {
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
  const props: HomeCMSProps = {
    title: {},
    buttonText: {},
  };
  const entryFields = Object.keys(entry.fields) as HomeFieldsName[];
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
