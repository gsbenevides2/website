import { Entry, EntrySkeletonType } from "contentful";
import { CMSData } from "./types";
import { getCMSClient } from "./getClient";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useMemo } from "react";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";

export type ContactsFields = {
  email: string | null;
  github: string | null;
  instagram: string | null;
  linkedin: string | null;
  minecraftText: string | null;
  musicPlaylistText: string | null;
  playlistLink: string | null;
  sendEmailText: string | null;
  textOfPixOption: string | null;
  twitter: string | null;
};

export type ContactsFieldsName = keyof ContactsFields;

export type ContactsCMSEntry = EntrySkeletonType<ContactsFields>;
export type ContactsEntry = Entry<ContactsCMSEntry, undefined, string>;
export type ContactsCMSProps = {
  [key in ContactsFieldsName]: InspectorModeTags | {};
};

export type ContactsUseCMSData = {
  entry: ContactsEntry;
  fields: ContactsFields;
  props: ContactsCMSProps;
};

export type ContactsCMSData = CMSData<ContactsCMSEntry>;

export const CONTACTS_PAGE_CONTENT_TYPE = "socialLinks";

export const getCMSDataForContactsPage = async (
  preview: boolean
): Promise<ContactsCMSData> => {
  const client = getCMSClient(preview);
  const entries = await client.getEntries<ContactsCMSEntry>({
    content_type: CONTACTS_PAGE_CONTENT_TYPE,
  });
  return {
    entries,
    locale: "pt-BR",
    isPreview: preview,
  };
};

export const useCMSDataForContactsPage = (
  cmsData: ContactsCMSData
): ContactsUseCMSData => {
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
  const props: ContactsCMSProps = {
    email: {},
    github: {},
    instagram: {},
    linkedin: {},
    minecraftText: {},
    musicPlaylistText: {},
    playlistLink: {},
    sendEmailText: {},
    textOfPixOption: {},
    twitter: {},
  };
  const entryFields = Object.keys(entry.fields) as ContactsFieldsName[];
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
