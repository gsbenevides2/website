import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { FileInputProps } from "../FileInput";
import { Button } from "../Button";
import styles from "./styles.module.css";
import { downloadFile } from "@/utils/downloadFile";

interface Asset {
  altText: string;
  file: File;
}

interface AssetsInputProps extends Omit<FileInputProps, "state" | "setState"> {
  state: Asset[];
  setState: Dispatch<SetStateAction<Asset[]>>;
  allowDownload?: boolean;
}

export default function AssetsInput(props: AssetsInputProps) {
  const { state, setState, ...rest } = props;

  const assetRemove = useCallback(
    (index: number) => {
      setState(state.filter((_, i) => i !== index));
    },
    [state, setState]
  );

  const addAsset = useCallback(() => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.multiple = false;
    input.onchange = (e) => {
      // @ts-ignore
      const files = e.target.files;
      if (files == null || files.length === 0) return;
      const [file] = files;
      const altText = window.prompt("Qual o texto alternativo da imagem?");
      if (altText == null) return;
      setState((state) => [...state, { altText, file }]);
    };
    input.click();
  }, [setState]);

  const downloadAsset = useCallback((asset: Asset) => {
    const fileName = asset.file.name;
    const url = URL.createObjectURL(asset.file);
    downloadFile(url, fileName);
  }, []);

  const assetsContent = useMemo(() => {
    return state.map((asset, index) => (
      <div key={index} className={styles.asset}>
        <div className={styles.altText}>
          <span>Nome do Arquivo: {asset.file.name}</span>
          <br />
          <span>Texto Alternativo: {asset.altText}</span>
        </div>
        {props.allowDownload && (
          <div
            className={styles.remove}
            onClick={() => {
              downloadAsset(asset);
            }}
          >
            Baixar
          </div>
        )}
        <div
          className={styles.remove}
          onClick={() => {
            assetRemove(index);
          }}
        >
          Remover
        </div>
      </div>
    ));
  }, [state, props.allowDownload, downloadAsset, assetRemove]);

  return (
    <div className={styles.container}>
      <label>Lista de Assets:</label>
      <div className={styles.header}>
        <Button className={styles.button} onClick={addAsset} type="button">
          Adicionar Asset
        </Button>
      </div>
      <div className={styles.content}>{assetsContent}</div>
    </div>
  );
}
