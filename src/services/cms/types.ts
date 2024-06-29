import { EntryCollection, EntrySkeletonType } from "contentful";

export type CMSData<T extends EntrySkeletonType> = {
  entries: EntryCollection<T, undefined, string>;
  locale: "pt-BR";
  isPreview: boolean;
};

export type RichTextContent = {
  content: [
    {
      content: Array<{
        data: {};
        marks: Array<{
          type: "bold";
        }>;
        value: string;
        nodeType: "text";
      }>;
      nodeType: "paragraph";
    }
  ];
};
