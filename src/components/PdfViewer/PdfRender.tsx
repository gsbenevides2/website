import { Document, Page, pdfjs } from "react-pdf";
import {
  ClassName,
  OnDocumentLoadSuccess,
  OnPageLoadSuccess,
} from "react-pdf/dist/cjs/shared/types";

interface Props {
  file: File | undefined | string;
  pageNumber: number | undefined;
  onLoadSuccess: OnDocumentLoadSuccess | undefined;
  onPageLoadSuccess?: OnPageLoadSuccess | undefined;
  className?: ClassName | undefined;
}

export default function PdfRender(props: Props) {
  pdfjs.GlobalWorkerOptions.workerSrc = "/noprecache/pdfjs/pdf.worker.min.js";
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
