import { Button } from "@/components/Button";
import { Form, Input } from "@/components/Form";
import InputCustom from "@/components/Input";
import Loader from "@/components/Loader";
import {
    AuthState,
    useAdminAuthentication,
} from "@/services/firebase/client/auth";
import { addPage } from "@/services/firebase/client/cms";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./editor.styles.module.scss";

interface FormData {
    name: string;
    description: string;
    path: string;
}

export default function NewPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { state: authState } = useAdminAuthentication();

    useEffect(() => {
        if (authState === AuthState.Authenticated) {
            setIsLoading(false);
        } else if (authState === AuthState.Unauthenticated) {
            router.push("/admin");
        }
    }, [authState, router]);

    const handleSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);
        await addPage(data);
        router.push("/admin/cms/pages");
    }, [router]);

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
                <Input
                    name="name"
                    placeholder="Nome"
                    type="text"
                    required
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Input
                    name="path"
                    placeholder="Caminho"
                    type="text"
                    required
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Input
                    name="description"
                    placeholder="Descrição"
                    type="text"
                    required
                    customComponent={({ ref, ...props }) => (
                        <InputCustom {...props} />
                    )}
                />
                <Button type="submit">Adicionar</Button>
            </Form>
        </div>
    );
}
