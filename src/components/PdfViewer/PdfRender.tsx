import { Document, Page, pdfjs } from "react-pdf";
import { OnDocumentLoadSuccess, OnPageLoadSuccess, ClassName } from "./types";

interface Props {
  file: File | undefined | string;
  pageNumber: number | undefined;
  onLoadSuccess: OnDocumentLoadSuccess | undefined;
  onPageLoadSuccess?: OnPageLoadSuccess | undefined;
  className?: ClassName | undefined;
}

export default function PdfRender(props: Props) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  return (
    <Document
      file={props.file}
      noData=""
      onLoadSuccess={props.onLoadSuccess}
      loading={null}
    >
      <Page
        pageNumber={props.pageNumber}
        renderAnnotationLayer={false}
        className={props.className}
        onLoadSuccess={props.onPageLoadSuccess}
      />
    </Document>
  );
}
