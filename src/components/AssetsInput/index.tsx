import {
  Dispatch,
  SetStateAction,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import FileInput, { FileInputProps } from "../FileInput";
import { Button } from "../Button";
import styles from "./styles.module.css";

interface Asset {
  altText: string;
  file: File;
}

interface AssetsInputProps extends Omit<FileInputProps, "state" | "setState"> {
  state: Asset[];
  setState: Dispatch<SetStateAction<Asset[]>>;
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

  const assetsContent = useMemo(() => {
    return state.map((asset, index) => (
      <div key={index} className={styles.asset}>
        <div className={styles.altText}>
          <span>Nome do Arquivo: {asset.file.name}</span>
          <br />
          <span>Texto Alternativo: {asset.altText}</span>
        </div>
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
  }, [state, assetRemove]);

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
