import { EntryCollection, EntrySkeletonType } from "contentful";

export type CMSData<T extends EntrySkeletonType> = {
  entries: EntryCollection<T, undefined, string>;
  locale: "pt-BR";
  isPreview: boolean;
};
