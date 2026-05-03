import { Button } from "@/components/Button";
import {
  Form,
  Input,
  StatelessInput,
  Textarea,
  useFormContext,
} from "@/components/Form";
import { FormSubmitEvent } from "@/components/Form/types";
import InputCustom from "@/components/Input";
import { PdfInput } from "@/components/PdfInput";
import TextareaCustom from "@/components/TextArea";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useCertificationLoader } from "@/hooks/certifications/useCertificationLoader";
import {
  useCertificationSubmit,
  FormValues,
} from "@/hooks/certifications/useCertificationSubmit";
import { LoaderOverlay } from "@/components/pages/admin/blog/LoaderOverlay";

export default function Page() {
  const router = useRouter();
  const certId =
    router.query.id === "new" ? undefined : (router.query.id as string);

  const { state: authState } = useAdminAuthentication();
  const formContext = useFormContext();

  // Custom hooks for cleaner logic
  const { isLoading, setIsLoading, loadCertificationData } =
    useCertificationLoader(certId, formContext);
  const { handleSubmit } = useCertificationSubmit(certId, setIsLoading);

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
      loadCertificationData();
    } else if (authState === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [authState, loadCertificationData, router]);

  return (
    <>
      <div
        className={classNames(styles.pageWrapper, { [styles.hide]: isLoading })}
      >
        <div className={styles.container}>
          <Head>
            <title>{certId ? "Editar" : "Adicionar"} Certificação</title>
          </Head>
          <h1>{certId ? "Editar" : "Adicionar"} Certificado</h1>
          <Form
            className={styles.form}
            submit={formSubmit}
            contextLoader={formContext.contextLoader}
          >
            <Input
              placeholder="Digite o Nome do Curso/Certificado"
              required
              id="name"
              name="name"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Nome do Curso/Certificado:" />
              )}
            />
            <Input
              placeholder="Digite o Nome da Instituição"
              required
              id="institution"
              name="institution"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Instituição:" />
              )}
            />
            <Input
              type="date"
              id="date"
              name="date"
              required
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Data de Emissão" />
              )}
            />
            <Input
              id="externalReference"
              name="externalReference"
              placeholder="Digite o link para o Certificado"
              type="url"
              customComponent={({ ref, ...props }) => (
                <InputCustom
                  {...props}
                  label="Referência Externa: (Opcional)"
                />
              )}
            />
            <Textarea
              id="descriptionDesktop"
              name="descriptionDesktop"
              required
              placeholder="Descrição Desktop (Markdown)"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  label="Descrição Desktop: (Markdown)"
                  className={styles.textarea}
                />
              )}
            />
            <Textarea
              id="descriptionMobile"
              name="descriptionMobile"
              required
              placeholder="Descrição Mobile (Markdown)"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  label="Descrição Mobile: (Markdown)"
                  className={styles.textarea}
                />
              )}
            />
            <StatelessInput
              name="pdf"
              customComponent={(props) => (
                <PdfInput
                  {...props}
                  label="Selecione o PDF do Certificado"
                  allowDownload
                />
              )}
            />
            <Textarea
              id="keywords"
              name="keywords"
              required
              placeholder="Digite as palavras chave separadas por vírgula"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  label="Palavras Chave:"
                  className={styles.textarea}
                />
              )}
            />
            <Button type="submit">Salvar Certificado</Button>
          </Form>
        </div>
      </div>

      <LoaderOverlay isLoading={isLoading} />
    </>
  );
}
