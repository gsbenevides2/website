import { Button } from "@/components/Button";
import { Form, Input } from "@/components/Form";
import InputCustom from "@/components/Input";
import Loader from "@/components/Loader";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import * as cmsClient from "@/services/firebase/client/cms";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "../editor.styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

interface FormData {
  name: string;
  description: string;
  path: string;
}

export default function EditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query as { id: string };
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
  }, [authState, loadPage, router]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      await cmsClient.updatePage(id, data);
      router.push("/admin/cms/pages");
    },
    [id, router],
  );

  const handleChange = useCallback((key: keyof FormData, value: string) => {
    setPage((prev) =>
      prev
        ? {
            ...prev,
            [key]: value,
          }
        : null,
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
      <DefaultSeo
        title={`Editar Página - Administração do Site do Guilherme`}
        description={`Editar a página no site do Guilherme. Gerencie as informações da página de forma fácil e rápida.`}
        site_name="Site do Guilherme"
        type="website"
        canonical={process.env.NEXT_PUBLIC_DOMAIN + "/admin/cms/pages/" + id}
        keywords={[
          "administração",
          "painel de controle",
          "páginas",
          "cms",
          "editar",
        ]}
        image={getOpenMediaImageForNextSeo(
          "Administração das Páginas do Guilherme",
        )}
        noFollow
        noIndex
      />
      <h1>Editar Página</h1>
      <Form submit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          type="text"
          required
          value={page?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          customComponent={({ ref, ...props }) => <InputCustom {...props} />}
        />
        <Input
          name="path"
          placeholder="Caminho"
          type="text"
          required
          value={page?.path}
          onChange={(e) => handleChange("path", e.target.value)}
          customComponent={({ ref, ...props }) => <InputCustom {...props} />}
        />
        <Input
          name="description"
          placeholder="Descrição"
          type="text"
          required
          value={page?.description}
          onChange={(e) => handleChange("description", e.target.value)}
          customComponent={({ ref, ...props }) => <InputCustom {...props} />}
        />
        <Button type="submit">Editar</Button>
      </Form>
    </div>
  );
}
