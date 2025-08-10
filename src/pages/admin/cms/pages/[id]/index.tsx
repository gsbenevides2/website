import { Button } from "@/components/Button";
import { Form, Input } from "@/components/Form";
import InputCustom from "@/components/Input";
import Loader from "@/components/Loader";
import {
    AuthState,
    useAdminAuthentication,
} from "@/services/firebase/client/auth";
import * as cmsClient from "@/services/firebase/client/cms";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "../editor.styles.module.scss";

interface FormData {
    name: string;
    description: string;
    path: string;
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as { id: string };
    return {
        props: { id },
    };
}

export default function EditPage({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { state: authState } = useAdminAuthentication();
    const [page, setPage] = useState<FormData | null>(null);

    const loadPage = useCallback(async () => {
        const page = await cmsClient.getPage(id);
        const pageData = page.data();
        if (pageData) {
            setPage({
                name: pageData.name,
                description: pageData.description,
                path: pageData.path,
            });
        }
    }, [id]);

    useEffect(() => {
        if (authState === AuthState.Authenticated) {
            loadPage().then(() => {
                setIsLoading(false);
            });
        } else if (authState === AuthState.Unauthenticated) {
            router.push("/admin");
        }
    }, [authState]);

    const handleSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);
        await cmsClient.updatePage(id, data);
        router.push("/admin/cms/pages");
    }, [id, router]);

    const handleChange = useCallback((key: keyof FormData, value: string) => {
        setPage((prev) => (prev
            ? {
                ...prev,
                [key]: value,
            }
            : null)
        );
    }, []);

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
                <title>Editar Página</title>
            </Head>
            <h1>Editar Página</h1>
            <Form submit={handleSubmit}>
                <Input
                    name="name"
                    placeholder="Nome"
                    type="text"
                    required
                    value={page?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Input
                    name="path"
                    placeholder="Caminho"
                    type="text"
                    required
                    value={page?.path}
                    onChange={(e) => handleChange("path", e.target.value)}
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Input
                    name="description"
                    placeholder="Descrição"
                    type="text"
                    required
                    value={page?.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)}
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Button type="submit">Editar</Button>
            </Form>
        </div>
    );
}
