import { Button } from "@/components/Button";
import { Form, Textarea } from "@/components/Form";
import Loader from "@/components/Loader";
import TextareaCustom from "@/components/TextArea";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import { addVersion, getLatestVersion } from "@/services/firebase/client/cms";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "../../editor.styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

interface FormData {
  content: string;
}

export default function NewVersion() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { state: authState } = useAdminAuthentication();
  const [content, setContent] = useState("");
  const { id } = router.query as { id: string };

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
  }, [authState, loadPage, router]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      await addVersion(id, {
        content: data.content,
      });
      router.push(`/admin/cms/pages/${id}/versions`);
    },
    [id, router],
  );

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
      <DefaultSeo
        title={`Adicionar Nova Versão - Administração do Site do Guilherme`}
        description={`Adicionar uma nova versão para a página no site do Guilherme. Gerencie as versões de forma fácil e rápida.`}
        site_name="Site do Guilherme"
        type="website"
        canonical={
          process.env.NEXT_PUBLIC_DOMAIN +
          "/admin/cms/pages/" +
          id +
          "/versions/new"
        }
        keywords={[
          "administração",
          "painel de controle",
          "páginas",
          "versões",
          "adicionar/editar",
        ]}
        image={getOpenMediaImageForNextSeo(
          "Administração das Páginas do Guilherme",
        )}
        noFollow
        noIndex
      />
      <h1>Nova Página</h1>
      <Form submit={handleSubmit}>
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
          required
          customComponent={({ ref, ...props }) => <TextareaCustom {...props} />}
        />

        <Button type="submit">Adicionar</Button>
      </Form>
    </div>
  );
}
