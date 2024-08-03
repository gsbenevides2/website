import { downloadFile } from "@/utils/downloadFile";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbChevronLeft, TbChevronRight, TbDownload } from "react-icons/tb";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import IconButton from "../IconButon";
import styles from "./styles.module.css";

export interface Props {
  file?: string;
  fileName?: string;
  allowDownload?: boolean;
  fallback?: {
    src: string;
    blur: string;
    width: number;
    height: number;
  };
}
export default function PdfViewer(props: Props) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [hideFallback, setHideFallback] = useState(false);
  const onLoadSuccess: OnDocumentLoadSuccess = useCallback(({ numPages }) => {
    setPageNumber(1);
    setNumPages(numPages);
  }, []);
  const PdfRender = dynamic(() => import("./PdfRender"), {
    ssr: false,
  });

  const changePage = useCallback(
    (offset: number) => {
      if (!numPages) return;
      if (pageNumber + offset < 1 || pageNumber + offset > numPages) return;
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
    },
    [pageNumber, numPages]
  );

  const downloadPdf = useCallback(() => {
    if (!props.file) return;
    const fileName = props.fileName ?? "file.pdf";
    downloadFile(props.file, fileName);
  }, [props.file, props.fileName]);

  const pageSuccess = useCallback(() => {
    setTimeout(() => setHideFallback(true), 4000);
  }, []);

  if (!props.file) return <></>;
  /*
  const responsiveWidth = props.fallback?.width ? (props.fallback.width * 100) / 1600 : undefined;
  const responsiveHeight = props.fallback?.height ? (props.fallback.height * 100) / 1600 : undefined;

  const resposiveWidthStyle = responsiveWidth ? `min(${responsiveWidth}vw, ${props.fallback?.width}px)` : undefined;
  const resposiveHeightStyle = responsiveHeight ? `min(${responsiveHeight}vh, ${props.fallback?.height}px)` : undefined;

  const mobileResponsiveWidth = 

  const dynamicCss = `
    .${styles.containerArea} {
      width: ${resposiveWidthStyle};
      height: ${resposiveHeightStyle};
    }
    .${styles.fallbackImageContainer} {
      width: ${resposiveWidthStyle};
      height: ${resposiveHeightStyle};
    }
    @media (max-width: 768px) {
      .${styles.containerArea} {
        width: 100%;
        height: 100%;
      }
      .${styles.fallbackImageContainer} {
        width: 100%;
        height: 100%;
      }
    }
  `;
    */
  return (
    <div className={styles.pdf}>
      <div className={styles.pdfController}>
        <IconButton icon={TbChevronLeft} size={16} onClick={() => changePage(-1)} className={styles.button} />
        {numPages ? <p>{`${pageNumber} de ${numPages}`}</p> : <p>Carregando...</p>}
        <IconButton icon={TbChevronRight} size={16} onClick={() => changePage(1)} className={styles.button} />
        {props.allowDownload && <IconButton icon={TbDownload} size={16} onClick={downloadPdf} className={styles.button} />}
      </div>
      <div className={styles.containerArea}>
        <PdfRender pageNumber={pageNumber} file={props.file} onLoadSuccess={onLoadSuccess} className={styles.page} onPageLoadSuccess={pageSuccess} />
        {props.fallback && (
          <div className={styles.fallbackImageContainer}>
            <Image placeholder="blur" blurDataURL={props.fallback.blur} src={props.fallback.src} alt="Imagem de fallback" width={props.fallback.width} height={props.fallback.height} className={styles.fallbackImage} />
          </div>
        )}
      </div>
    </div>
  );
}
