import { Nunito_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { isValidElement, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Mermaid from "@/components/Mermaid";
import styles from "./styles.module.scss";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node))
    return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito" });

interface Asset {
  altText: string;
  file: File;
}

interface MarkdownEditorProps {
  label?: string;
  state?: string;
  setState?: (value: string) => void;
  assets?: Asset[];
}

export default function MarkdownEditor({
  label,
  state,
  setState,
  assets,
}: MarkdownEditorProps) {
  const [assetUrls, setAssetUrls] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const map = new Map<string, string>();
    const created: string[] = [];

    assets?.forEach((asset) => {
      const url = URL.createObjectURL(asset.file);
      map.set(asset.file.name, url);
      created.push(url);
    });

    setAssetUrls(map);

    return () => {
      created.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [assets]);

  const previewOptions = useMemo(
    () => ({
      components: {
        img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
          let resolvedSrc = src ?? "";
          if (
            typeof resolvedSrc === "string" &&
            resolvedSrc.startsWith("firebase://assets/")
          ) {
            const filename = resolvedSrc.replace("firebase://assets/", "");
            resolvedSrc = assetUrls.get(filename) ?? resolvedSrc;
          }
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedSrc}
              alt={alt}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          );
        },
        code: ({ className, children }: React.HTMLAttributes<HTMLElement>) => {
          if (String(className ?? "").includes("language-mermaid")) {
            return <Mermaid chart={extractText(children).trim()} />;
          }
          return <code className={className}>{children}</code>;
        },
      },
    }),
    [assetUrls],
  );

  return (
    <div
      className={`${styles.container} ${nunito.variable}`}
      data-color-mode="light"
    >
      {label && <label className={styles.label}>{label}</label>}
      <MDEditor
        value={state ?? ""}
        onChange={(val) => setState?.(val ?? "")}
        height={500}
        preview="live"
        className={styles.editor}
        previewOptions={previewOptions}
      />
    </div>
  );
}
