import { Button } from "@/components/Button";
import { Form, Textarea } from "@/components/Form";
import Loader from "@/components/Loader";
import TextareaCustom from "@/components/TextArea";
import {
    AuthState,
    useAdminAuthentication,
} from "@/services/firebase/client/auth";
import { addVersion, getLatestVersion } from "@/services/firebase/client/cms";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "../../editor.styles.module.scss";

interface FormData {
    content: string;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as { id: string };
    return {
        props: { id },
    };
}

export default function NewVersion({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { state: authState } = useAdminAuthentication();
    const [content, setContent] = useState("");

    const loadPage = useCallback(async () => {
        const latestVersion = await getLatestVersion(id);
        if (latestVersion) {
            const latestVersionData = latestVersion.data();
            if (latestVersionData) {
                setContent(latestVersionData.content);
            }
        }
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        if (authState === AuthState.Authenticated) {
            loadPage();
        } else if (authState === AuthState.Unauthenticated) {
            router.push("/admin");
        }
    }, [authState, loadPage]);

    const handleSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);
        await addVersion(id, {
            content: data.content,
        });
        router.push(`/admin/cms/pages/${id}/versions`);
    }, [id, router]);

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <Loader />
                <span>Estamos fazendo algumas operações aguarde</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Adicionar Página</title>
            </Head>
            <h1>Nova Página</h1>
            <Form submit={handleSubmit}>
                <Textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Conteúdo"
                    required
                    customComponent={({ ref, ...props }) => (
                        <TextareaCustom {...props} />
                    )}
                />

                <Button type="submit">Adicionar</Button>
            </Form>
        </div>
    );
}
