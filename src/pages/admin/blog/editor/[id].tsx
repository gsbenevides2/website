import InputCustom from "@/components/Input";
import TextareaCustom from "@/components/TextArea";
import MarkdownEditor from "@/components/MarkdownEditor";
import Head from "next/head";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { ImageInput } from "@/components/ImageInput";
import AssetsInput from "@/components/AssetsInput";
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
import { usePostLoader } from "@/hooks/blog/usePostLoader";
import { usePostSubmit, FormValues } from "@/hooks/blog/usePostSubmit";
import { useAIThumbnail } from "@/hooks/blog/useAIThumbnail";
import { AIModal } from "@/components/pages/admin/blog/AIModal";
import { LoaderOverlay } from "@/components/pages/admin/blog/LoaderOverlay";

export default function Page() {
  const router = useRouter();
  const postId =
    router.query.id === "new" ? undefined : (router.query.id as string);

  const { state: authState } = useAdminAuthentication();
  const formContext = useFormContext();

  // Custom hooks for cleaner logic
  const {
    isLoading,
    setIsLoading,
    previewAssets,
    setPreviewAssets,
    loadPostData,
  } = usePostLoader(postId, formContext);
  const { handleSubmit } = usePostSubmit(postId, setIsLoading);
  const aiThumbnail = useAIThumbnail(formContext);

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
      loadPostData();
    } else if (authState === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [authState, loadPostData, router]);

  return (
    <>
      <div
        className={classNames(styles.pageWrapper, { [styles.hide]: isLoading })}
      >
        <div className={styles.container}>
          <Head>
            <title>{postId ? "Editar" : "Adicionar"} Post</title>
          </Head>
          <h1>{postId ? "Editar" : "Adicionar"} Post</h1>
          <Form
            className={styles.form}
            submit={formSubmit}
            contextLoader={formContext.contextLoader}
          >
            <Input
              placeholder="Digite o Nome do Post"
              required
              id="name"
              name="name"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Nome do Post:" />
              )}
            />
            <Textarea
              placeholder="Digite uma descrição para o Post:"
              required
              className={styles.textarea}
              id="description"
              name="description"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom {...props} label="Descrição:" />
              )}
            />
            <Input
              type="date"
              required
              name="date"
              id="date"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Data do Post:" />
              )}
            />
            <StatelessInput
              name="image"
              customComponent={(props) => (
                <div>
                  <ImageInput
                    {...props}
                    label="Selecione a thumbnail do post"
                    required
                    allowDownload
                  />
                  <button
                    type="button"
                    onClick={aiThumbnail.openModal}
                    className={styles.aiButton}
                  >
                    ✨ Gerar Thumbnail com IA
                  </button>
                </div>
              )}
            />

            <Textarea
              placeholder="Digite o texto alternativo da thumbnail"
              className={styles.textarea}
              id="altThumbnail"
              name="altThumbnail"
              required
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  label="Texto Alternativo da Thumbnail:"
                />
              )}
            />
            <StatelessInput
              name="content"
              customComponent={(props) => (
                <MarkdownEditor
                  {...props}
                  label="Conteúdo: (Markdown)"
                  assets={previewAssets}
                />
              )}
            />
            <StatelessInput
              name="assets"
              initialState={[]}
              customComponent={({ state, setState }) => (
                <AssetsInput
                  state={state}
                  setState={(value) => {
                    const resolved =
                      value instanceof Function ? value(state) : value;
                    setState(resolved);
                    setPreviewAssets(resolved);
                  }}
                  allowDownload
                />
              )}
            />
            <Button type="submit">Salvar Post</Button>
          </Form>
        </div>
      </div>

      <LoaderOverlay isLoading={isLoading} />

      <AIModal
        open={aiThumbnail.showModal}
        description={aiThumbnail.description}
        isGenerating={aiThumbnail.isGenerating}
        onDescriptionChange={aiThumbnail.setDescription}
        onGenerate={aiThumbnail.handleGenerate}
        onClose={aiThumbnail.closeModal}
      />
    </>
  );
}
