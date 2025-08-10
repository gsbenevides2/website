import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";
import { MdCopyAll } from "react-icons/md";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./styles.module.scss";

const jetBrainsMono = JetBrains_Mono({
    variable: "--jetBrainsMono",
    subsets: ["latin"],
});

interface CodeProps {
    className: string;
    children: string;
}

const Code = ({ className, children }: CodeProps) => {
    const [copyMessage, setCopyMessage] = useState(
        "Copiar para Area de Transferencia",
    );
    function copy() {
        copyTextToClipboard(children).then(() => {
            setCopyMessage("Copiado");
            setTimeout(() => {
                setCopyMessage("Copiar para Area de Transferencia");
            }, 3000);
        });
    }
    console.log(className);
    return (
        <div className={jetBrainsMono.variable}>
            <SyntaxHighlighter
                language={className.replace("language-", "")}
                style={cb}
                customStyle={{
                    borderRadius: "8px 8px 0px 0px",
                    margin: "1em 0em 0em 0em",
                    ...jetBrainsMono.style,
                }}
            >
                {children}
            </SyntaxHighlighter>
            <div className={styles.copy} onClick={copy}>
                <MdCopyAll />
                <span>{copyMessage}</span>
            </div>
        </div>
    );
};

export default Code;
