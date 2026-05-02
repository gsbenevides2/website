import { Nunito_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import styles from "./styles.module.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito" });

interface MarkdownEditorProps {
  label?: string;
  state?: string;
  setState?: (value: string) => void;
}

export default function MarkdownEditor({
  label,
  state,
  setState,
}: MarkdownEditorProps) {
  return (
    <div className={`${styles.container} ${nunito.variable}`} data-color-mode="light">
      {label && <label className={styles.label}>{label}</label>}
      <MDEditor
        value={state ?? ""}
        onChange={(val) => setState?.(val ?? "")}
        height={500}
        preview="live"
        className={styles.editor}
      />
    </div>
  );
}
