import Code from "@/components/Code";
import * as cmsClient from "@/services/firebase/client/cms";
import { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";

interface Props {
    close: () => void;
    visible: boolean;
    pageId: string;
    versionId: string | null;
}

export function ViewVersionModal(props: Props) {
    const [versionData, setVersionData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadVersionData = useCallback(async () => {
        if (!props.versionId || !props.pageId) return;

        setLoading(true);
        setError(null);

        try {
            const version = await cmsClient.getVersion(
                props.pageId,
                props.versionId,
            );
            const versionData = version.data()?.content;
            if (versionData) {
                setVersionData(JSON.parse(versionData));
            } else {
                setError("Versão não encontrada");
            }
        } catch (err) {
            console.error("Erro ao carregar versão:", err);
            setError("Erro ao carregar dados da versão");
        } finally {
            setLoading(false);
        }
    }, [props.pageId, props.versionId]);

    useEffect(() => {
        if (props.visible && props.versionId) {
            loadVersionData();
        }
    }, [props.visible, props.versionId, loadVersionData]);

    const copyToClipboard = useCallback(() => {
        if (versionData) {
            navigator.clipboard.writeText(JSON.stringify(versionData, null, 2))
                .then(() => alert("JSON copiado para a área de transferência"))
                .catch(() => alert("Erro ao copiar JSON"));
        }
    }, [versionData]);

    if (!props.visible) return null;

    return (
        <div
            className={[styles.backdrop, props.visible ? "" : styles.hidden]
                .join(" ")}
        >
            <div className={styles.modal}>
                <button className={styles.close} onClick={props.close}>
                    <MdClose />
                </button>

                <h2>Visualizar JSON da Versão</h2>

                {loading && (
                    <div className={styles.loading}>
                        Carregando dados da versão...
                    </div>
                )}

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {versionData && !loading && (
                    <Code className="language-json">
                        {JSON.stringify(versionData, null, 2)}
                    </Code>
                )}
            </div>
        </div>
    );
}
