import FileInput, { FileInputProps } from "../FileInput";
import { ChangeEventHandler, memo, useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";

interface Props extends Omit<FileInputProps, "accept"> {}

function PdfInputUnmemorized(props: Props) {
  const { state,  ...rest } = props;
  const fileUrl = useMemo(()=>state?.[0] ? URL.createObjectURL(state[0]) : undefined, [state])
  const PdfViewer= dynamic(() => import("@/components/PdfViewer"), {
    ssr: false,
  });
  return (
    <div className={styles.pdfInput}>
      <FileInput {...rest} state={state} accept="application/pdf" />
      <PdfViewer file={fileUrl} />
    </div>
  );
}

export const PdfInput = memo(PdfInputUnmemorized);