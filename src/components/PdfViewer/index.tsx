import { Document, pdfjs, Page } from "react-pdf";
import styles from "./styles.module.css";
import { useCallback, useState } from "react";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import IconButton from "../IconButon";
import { TbChevronLeft, TbChevronRight, TbDownload } from "react-icons/tb";
import { downloadFile } from "@/utils/downloadFile";

export interface Props {
  file?: string;
  fileName?: string;
  allowDownload?: boolean;
}
export default function PdfViewer(props: Props) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess: OnDocumentLoadSuccess = useCallback(({ numPages }) => {
    setPageNumber(1);
    setNumPages(numPages);
  }, []);

  const changePage = useCallback(
    (offset: number) => {
      if (!numPages) return;
      if (pageNumber + offset < 1 || pageNumber + offset > numPages) return;
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
    },
    [pageNumber, numPages]
  );

  pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

  const downloadPdf = useCallback(() => {
    if (!props.file) return;
    const fileName = props.fileName ?? "file.pdf";
    downloadFile(props.file, fileName);
  }, [props.file, props.fileName]);

  if (!props.file) return <></>;

  return (
    <div className={styles.pdf}>
      <div className={styles.pdfController}>
        <IconButton
          icon={TbChevronLeft}
          size={16}
          onClick={() => changePage(-1)}
          className={styles.button}
        />
        <p>{`${pageNumber} de ${numPages}`}</p>
        <IconButton
          icon={TbChevronRight}
          size={16}
          onClick={() => changePage(1)}
          className={styles.button}
        />
        {props.allowDownload && (
          <IconButton
            icon={TbDownload}
            size={16}
            onClick={downloadPdf}
            className={styles.button}
          />
        )}
      </div>
      <Document file={props.file} noData="" onLoadSuccess={onLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          className={styles.page}
        />
      </Document>
    </div>
  );
}
