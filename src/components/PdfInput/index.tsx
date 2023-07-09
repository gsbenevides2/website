import FileInput, { FileInputProps } from "../FileInput";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { PdfViewer } from "../PdfViewer";
import styles from "./styles.module.css";

interface Props extends Omit<FileInputProps, "accept"> {}

export function PdfInput(props: Props) {
  const { state,  ...rest } = props;
  const fileUrl = useMemo(()=>state?.[0] ? URL.createObjectURL(state[0]) : undefined, [state])

  return (
    <div className={styles.pdfInput}>
      <FileInput {...rest} state={state} accept="application/pdf" />
      <PdfViewer file={fileUrl} />
    </div>
  );
}
