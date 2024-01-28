import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import styles from "./styles.module.css";
import IconButton from "../IconButon";
import { TbDownload } from "react-icons/tb";
import { downloadFile } from "@/utils/downloadFile";

export interface FileInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  label?: string;
  state?: File[];
  setState?: (value: File[]) => void;
  required?: boolean;
  allowDownload?: boolean;
}

export default function FileInput(props: FileInputProps) {
  const {
    label: propsLabel,
    state,
    setState,
    onChange: propOnChange,
    accept,
    required,
  } = props;

  const [label, setLabel] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (propOnChange) propOnChange(e);
      if (setState) {
        const files = e.target.files;
        if (files == null || files.length === 0) setState([]);
        else setState(Array.from(files));
      }
    },
    [setState, propOnChange]
  );

  const buttonClick = useCallback(() => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = accept || "";
    input.required = required || false;
    input.multiple = false;
    // @ts-ignore
    input.onchange = onChange;
    input.click();
  }, [accept, onChange, required]);
  const download = useCallback(() => {
    if (state == null || state.length === 0) return;
    const file = state[0];
    const filename = file.name;
    const url = URL.createObjectURL(file);
    downloadFile(url, filename);
  }, [state]);

  useEffect(() => {
    if (state == null || state.length === 0)
      setLabel(propsLabel || "Sem arquivos selecionados");
    else if (state.length === 1 && state[0].name) setLabel(state[0].name);
    else setLabel(`${state.length} arquivos selecionados`);
  }, [state, propsLabel]);

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={buttonClick} type="button">
        Escolher Arquivo
      </Button>
      <span>{label}</span>
      {props.allowDownload && (
        <IconButton
          icon={TbDownload}
          size={16}
          onClick={download}
          className={styles.button}
        />
      )}
    </div>
  );
}
