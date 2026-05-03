import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

export type DocumentCallback = PDFDocumentProxy;

export type PageCallback = PDFPageProxy & {
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
};

export type OnDocumentLoadSuccess = (document: DocumentCallback) => void;

export type OnPageLoadSuccess = (page: PageCallback) => void;

export type ClassName =
  | string
  | null
  | undefined
  | (string | null | undefined)[];
