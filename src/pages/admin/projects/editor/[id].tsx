import InputCustom from "@/components/Input";
import TextareaCustom from "@/components/TextArea";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { ImageInput } from "@/components/ImageInput";
import {
  addOrUpdateProject,
  getProject,
  getProjectImageFile,
} from "@/services/firebase/client/projects";
import MyError from "@/utils/MyError";
import { fileToBase64, generateBlur } from "@/utils/imageManager";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import Loader from "@/components/Loader";
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

interface FormValues {
  name: string;
  github?: URL;
  youtube?: URL;
  descriptionDesktop: string;
  descriptionMobile: string;
  image: File[];
  keywords: string;
}

export default function Page() {
  const router = useRouter();
  const projectId =
    router.query.id === "new" ? undefined : (router.query.id as string);
  const [isLoading, setIsLoading] = useState(true);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const { state: authState } = useAdminAuthentication();

  const formContext = useFormContext();

  const formSubmit: FormSubmitEvent<FormValues> = useCallback(
    async (e) => {
      if (!e.image[0]) {
        alert("Selecione uma Imagem");
        return;
      }

      setIsLoading(true);
      const responseProjectId = await addOrUpdateProject({
        id: projectId,
        name: e.name,
        github: e.github?.toString() ?? "",
        youtube: e.youtube?.toString() ?? "",
        descriptionDesktop: e.descriptionDesktop,
        descriptionMobile: e.descriptionMobile,
        image: e.image[0],
        keywords: e.keywords.split(",").map((e) => e.trim()),
        imageBlur: await generateBlur(await fileToBase64(e.image[0])),
      });
      await revalidateNextPages("projects", responseProjectId);

      router.push("/admin/projects");
    },
    [projectId, router]
  );

  const loadDocData = useCallback(async () => {
    if (!projectId) return setIsLoading(false);

    try {
      const project = await getProject(projectId);
      const imageFile = await getProjectImageFile(projectId);
      formContext.changeMultipleInputValues({
        name: project.name,
        github: project.github,
        youtube: project.youtube,
        descriptionDesktop: project.descriptionDesktop,
        descriptionMobile: project.descriptionMobile,
        keywords: project.keywords.join(","),
        image: [imageFile],
      });
      setIsLoading(false);
    } catch (e) {
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do projeto. Veja o console para detalhes!"
        );
        console.error(e);
      }
      router.push("/admin/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, router]);

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      loadDocData();
    } else if (authState === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [authState, loadDocData, router]);

  useEffect(() => {
   
    async function showLoading() {
      if (!loader.current) return;
      if (!hidder.current) return;
      hidder.current.classList.add(styles.hide);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
    }
    async function hideLoading() {
      if (!loader.current) return;
      if (!hidder.current) return;
      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    }
    if (isLoading) showLoading();
    else hideLoading();
  }, [isLoading]);

  return (
    <>
      <div className={classNames(styles.hidder, styles.hide)} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{projectId ? "Editar" : "Adicionar"} Projeto</title>
          </Head>
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
                <ImageInput {...props} label="Imagem do Projeto:" />
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
      <div
        className={classNames(styles.loader, styles.update, styles.show)}
        ref={loader}
      >
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
