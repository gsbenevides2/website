import FileInput, { FileInputProps } from "../FileInput";
import { useMemo } from "react";
import styles from "./styles.module.css";

interface Props extends Omit<FileInputProps, "accept"> {}

export function ImageInput(props: Props) {
  const { state,  ...rest } = props;
  const fileUrl = useMemo(()=>state?.[0] ? URL.createObjectURL(state[0]) : undefined, [state])

  return (
    <div className={styles.imageInput}>
      <FileInput {...rest} state={state} accept="image/*" />
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      {fileUrl && <img src={fileUrl} alt="" />}
    </div>
  );
}
