import { Button } from "@/components/Button";
import { Form, Input, StatelessInput, Textarea, useFormContext } from "@/components/Form";
import { FormSubmitEvent } from "@/components/Form/types";
import InputCustom from "@/components/Input";
import Loader from "@/components/Loader";
import { PdfInput } from "@/components/PdfInput";
import TextareaCustom from "@/components/TextArea";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import { AuthState, useAdminAuthentication } from "@/services/firebase/client/auth";
import { addOrUpdateCertification, getCertificateFile, getCertification } from "@/services/firebase/client/certificates";
import MyError from "@/utils/MyError";
import { generateBlur } from "@/utils/imageManager";
import { pdf2Img } from "@/utils/pdf2Img";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function Page() {
  const router = useRouter();
  const certId = router.query.id === "new" ? undefined : (router.query.id as string);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formContext = useFormContext();

  const { state: authState } = useAdminAuthentication();
  const loadDocData = useCallback(async () => {
    if (!certId) return setIsLoading(false);

    try {
      const cert = await getCertification(certId);

      const certFile = await getCertificateFile(certId);
      formContext.changeMultipleInputValues({
        name: cert.name,
        institution: cert.institution,
        date: cert.date.toISOString().split("T")[0],
        externalReference: cert.externalReference,
        descriptionDesktop: cert.description.desktop,
        descriptionMobile: cert.description.mobile,
        pdf: [certFile],
        keywords: cert.keywords.join(","),
      });
    } catch (e) {
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert("Erro ao carregar dados do certificado. Veja o console para detalhes!");
        console.error(e);
      }
      router.push("/admin/certifications");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certId, router]);
  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      loadDocData();
    } else if (authState === AuthState.Unauthenticated) {
      setIsLoading(false);
      router.push("/admin");
    }
  }, [authState, loadDocData, router]);

  interface FormValues {
    name: string;
    institution: string;
    date: Date;
    externalReference: URL;
    descriptionDesktop: string;
    descriptionMobile: string;
    pdf: [File];
    keywords: string;
  }
  const formSubmit: FormSubmitEvent<FormValues> = useCallback(
    async (e) => {
      const { name, institution, date, externalReference, descriptionDesktop, descriptionMobile, pdf, keywords } = e;
      if (!pdf[0]) {
        alert("Selecione um PDF");
        return;
      }
      setIsLoading(true);

      const pdfThumbnail = await pdf2Img(pdf[0]);

      const responseCertId = await addOrUpdateCertification({
        id: certId,
        name: name,
        institution: institution,
        date: date,
        externalReference: externalReference?.toString() ?? "",
        description: {
          desktop: descriptionDesktop,
          mobile: descriptionMobile,
        },
        certificate: {
          pdf: {
            file: pdf[0],
          },
          thumbnail: {
            png: pdfThumbnail,
            blur: await generateBlur(pdfThumbnail),
          },
        },
        keywords: keywords.split(",").map((e) => e.trim()),
      });
      await revalidateNextPages("certificates", responseCertId);

      setIsLoading(false);
      router.push("/admin/certifications");
    },
    [certId, router]
  );

  useEffect(() => {
    function showLoading() {
      if (!loader.current || !hidder.current) return;
      hidder.current.classList.add(styles.hide);
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
    }
    function hideLoading() {
      if (!loader.current || !hidder.current) return;
      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    }
    if (isLoading) showLoading();
    else hideLoading();
  }, [loader, hidder, isLoading]);
  return (
    <>
      <div className={styles.hidder} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{certId ? "Editar" : "Adicionar"} Certificação</title>
          </Head>
          <h1>{certId ? "Editar" : "Adicionar"} Certificado</h1>
          <Form className={styles.form} submit={formSubmit} contextLoader={formContext.contextLoader}>
            <Input placeholder="Digite o Nome do Curso/Certificado" required id="name" name="name" customComponent={({ ref, ...props }) => <InputCustom {...props} label="Nome do Curso/Certificado:" />} />
            <Input placeholder="Digite o Nome da Instituição" required id="institution" name="institution" customComponent={({ ref, ...props }) => <InputCustom {...props} label="Instituição:" />} />
            <Input type="date" id="date" name="date" required customComponent={({ ref, ...props }) => <InputCustom {...props} label="Data de Emissão" />} />
            <Input id="externalReference" name="externalReference" placeholder="Digite o link para o Certificado" type="url" customComponent={({ ref, ...props }) => <InputCustom {...props} label="Referência Externa: (Opcional)" />} />
            <Textarea id="descriptionDesktop" name="descriptionDesktop" required placeholder="Descrição Desktop (Markdown)" customComponent={({ ref, ...props }) => <TextareaCustom {...props} label="Descrição Desktop: (Markdown)" className={styles.textarea} />} />
            <Textarea id="descriptionMobile" name="descriptionMobile" required placeholder="Descrição Mobile (Markdown)" customComponent={({ ref, ...props }) => <TextareaCustom {...props} label="Descrição Mobile: (Markdown)" className={styles.textarea} />} />
            <StatelessInput name="pdf" customComponent={(props) => <PdfInput {...props} label="Selecione o PDF do Certificado" allowDownload />} />
            <Textarea id="keywords" name="keywords" required placeholder="Digite as palavras chave separadas por vírgula" customComponent={({ ref, ...props }) => <TextareaCustom {...props} label="Palavras Chave:" className={styles.textarea} />} />
            <Button type="submit">Salvar Certificado</Button>
          </Form>
        </div>
      </div>
      <div className={styles.loader} ref={loader}>
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
