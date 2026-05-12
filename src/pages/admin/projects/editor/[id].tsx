import InputCustom from "@/components/Input";
import TextareaCustom from "@/components/TextArea";
import Head from "next/head";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { ImageInput } from "@/components/ImageInput";
import {
  Form,
  Input,
  StatelessInput,
  Textarea,
  useFormContext,
} from "@/components/Form";
import { FormSubmitEvent } from "@/components/Form/types";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import classNames from "classnames";
import { useProjectLoader } from "@/hooks/projects/useProjectLoader";
import {
  useProjectSubmit,
  FormValues,
} from "@/hooks/projects/useProjectSubmit";
import { LoaderOverlay } from "@/components/pages/admin/blog/LoaderOverlay";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

export default function Page() {
  const router = useRouter();
  const projectId =
    router.query.id === "new" ? undefined : (router.query.id as string);

  const { state: authState } = useAdminAuthentication();
  const formContext = useFormContext();

  // Custom hooks for cleaner logic
  const { isLoading, setIsLoading, loadProjectData } = useProjectLoader(
    projectId,
    formContext,
  );
  const { handleSubmit } = useProjectSubmit(projectId, setIsLoading);

  const formSubmit: FormSubmitEvent<FormValues> = handleSubmit;

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      loadProjectData();
    } else if (authState === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [authState, loadProjectData, router]);

  return (
    <>
      <div
        className={classNames(styles.pageWrapper, { [styles.hide]: isLoading })}
      >
        <div className={styles.container}>
          <DefaultSeo
            title={`${projectId ? "Editar" : "Adicionar"} Projeto - Administração do Site do Guilherme`}
            description={`${
              projectId ? "Editar" : "Adicionar"
            } um projeto no portfólio do site do Guilherme. Gerencie os projetos de forma fácil e rápida.`}
            site_name="Site do Guilherme"
            type="website"
            canonical={
              process.env.NEXT_PUBLIC_DOMAIN + "/admin/projects/editor/" + (projectId || "new")
            }
            keywords={[
              "administração",
              "painel de controle",
              "projetos",
              "adicionar/editar",
            ]}
            image={getOpenMediaImageForNextSeo(
              "Administração dos Projetos do Guilherme",
            )}
            noFollow
            noIndex
          />
          <h1>{projectId ? "Editar" : "Adicionar"} Projeto</h1>
          <Form
            className={styles.form}
            submit={formSubmit}
            contextLoader={formContext.contextLoader}
          >
            <Input
              id="name"
              name="name"
              placeholder="Digite o nome do projeto"
              required
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Nome do Projeto:" />
              )}
            />
            <Input
              id="github"
              name="github"
              type="url"
              placeholder="Digite o link do github"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Link do Github:" />
              )}
            />
            <Input
              id="youtube"
              name="youtube"
              type="url"
              placeholder="Digite o link do youtube"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Link do Youtube:" />
              )}
            />
            <Textarea
              id="descriptionDesktop"
              name="descriptionDesktop"
              placeholder="Digite a descrição do projeto para desktop"
              required
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  className={styles.textarea}
                  label="Descrição para Desktop:"
                />
              )}
            />
            <Textarea
              id="descriptionMobile"
              name="descriptionMobile"
              placeholder="Digite a descrição do projeto para mobile"
              required
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  className={styles.textarea}
                  label="Descrição para Mobile:"
                />
              )}
            />
            <StatelessInput
              name="image"
              customComponent={(props) => (
                <ImageInput
                  {...props}
                  label="Imagem do Projeto:"
                  allowDownload
                />
              )}
            />
            <Textarea
              id="keywords"
              name="keywords"
              placeholder="Digite as palavras chaves separadas por virgula"
              required
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  className={styles.textarea}
                  label="Palavras Chaves:"
                />
              )}
            />
            <Button type="submit">Salvar Projeto</Button>
          </Form>
        </div>
      </div>

      <LoaderOverlay isLoading={isLoading} />
    </>
  );
}
