import Input from "@/components/Input";
import { PdfInput } from "@/components/PdfInput";
import Textarea from "@/components/TextArea";
import Head from "next/head";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import {
  addOrUpdateCertification,
  getCertificateFile,
  getCertification,
} from "@/services/firebase/client/certificates";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import { parseYYYYMMDDtoDateObjc } from "@/utils/parseDateStringtoDateObj";
import { pdf2Img } from "@/utils/pdf2Img";
import MyError from "@/utils/MyError";
import TextArea from "@/components/TextArea";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import { generateBlur } from "@/utils/imageManager";
import Loader from "@/components/Loader";

async function sendTokenToServer(idToken: string, certificateId: string) {
  // Send token to your backend via HTTPS
  const response = await fetch("/api/revalidate/certificates", {
    method: "POST",
    body: JSON.stringify({ idToken, certificateId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao revalidar certificado!");
  }
}

export default function Page() {
  const router = useRouter();
  const certId =
    router.query.id === "new" ? undefined : (router.query.id as string);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [date, setDate] = useState("");
  const [externalReference, setExternalReference] = useState("");
  const [descriptionDesktop, setDescriptionDesktop] = useState("");
  const [descriptionMobile, setDescriptionMobile] = useState("");
  const [pdf, setPdf] = useState<File[]>([]);
  const [keywords, setKeywords] = useState("");

  useAdminAuthentication(() => {});

  const formSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!hidder.current) return;
      if (!loader.current) return;
      if (!pdf[0]) {
        alert("Selecione um PDF");
        return;
      }

      hidder.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const pdfThumbnail = await pdf2Img(pdf[0]);

      const responseCertId = await addOrUpdateCertification({
        id: certId,
        name: name,
        institution: institution,
        date: parseYYYYMMDDtoDateObjc(date),
        externalReference: externalReference,
        descriptionDesktop: descriptionDesktop,
        descriptionMobile: descriptionMobile,
        pdf: pdf[0],
        keywords: keywords.split(",").map((e) => e.trim()),
        pdfThumbnail,
        pdfThumbnailBlur: await generateBlur(pdfThumbnail),
      });
      await revalidateNextPages("certificates", responseCertId);

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";

      router.push("/admin/certifications");
    },
    [
      certId,
      date,
      descriptionDesktop,
      descriptionMobile,
      externalReference,
      institution,
      keywords,
      name,
      pdf,
      router,
      hidder,
      loader,
    ]
  );

  const loadDocData = useCallback(async () => {
    if (!certId) return;
    if (!loader.current) return;
    if (!hidder.current) return;
    hidder.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    loader.current.classList.add(styles.update);
    loader.current.classList.add(styles.show);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const cert = await getCertification(certId);
      setName(cert.name);
      setInstitution(cert.institution);
      setDate(cert.date.toISOString().split("T")[0]);
      if (cert.externalReference) setExternalReference(cert.externalReference);
      setDescriptionDesktop(cert.descriptionDesktop);
      setDescriptionMobile(cert.descriptionMobile);
      setKeywords(cert.keywords.join(","));

      const certFile = await getCertificateFile(certId);
      setPdf([certFile]);

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    } catch (e) {
      document.body.style.overflow = "auto";
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do certificado. Veja o console para detalhes!"
        );
        console.error(e);
      }
      router.push("/admin/certifications");
    }
  }, [certId, router, hidder, loader]);

  useEffect(() => {
    loadDocData();
  }, [loadDocData]);

  return (
    <>
      <div className={styles.hidder} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{certId ? "Editar" : "Adicionar"} Certificação</title>
          </Head>
          <h1>{certId ? "Editar" : "Adicionar"} Certificado</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <Input
              label="Nome do Curso/Certificado:"
              placeholder="Digite o Nome do Curso/Certificado"
              required
              state={name}
              setState={setName}
              id="name"
            />
            <Input
              label="Instituição:"
              placeholder="Digite o Nome da Instituição"
              required
              state={institution}
              setState={setInstitution}
              id="institution"
            />
            <Input
              label="Data de Emissão"
              type="date"
              required
              state={date}
              setState={setDate}
              id="date"
            />
            <Input
              label="Referência Externa: (Opcional)"
              placeholder="Digite o link para o Certificado"
              state={externalReference}
              setState={setExternalReference}
              id="externalReference"
            />
            <Textarea
              label="Descrição Desktop: (Markdown)"
              placeholder="Descrição Desktop (Markdown)"
              required
              className={styles.textarea}
              state={descriptionDesktop}
              setState={setDescriptionDesktop}
              id="descriptionDesktop"
            />
            <Textarea
              label="Descrição Mobile: (Markdown)"
              placeholder="Descrição Mobile (Markdown)"
              required
              className={styles.textarea}
              state={descriptionMobile}
              setState={setDescriptionMobile}
              id="descriptionMobile"
            />
            <PdfInput
              label="Selecione o PDF do Certificado"
              state={pdf}
              setState={setPdf}
            />
            <TextArea
              label="Palavras Chave:"
              placeholder="Digite as palavras chave separadas por vírgula"
              required
              state={keywords}
              setState={setKeywords}
              className={styles.textarea}
              id="keywords"
            />
            <Button type="submit">Salvar Certificado</Button>
          </form>
        </div>
      </div>
      <div className={styles.loader} ref={loader}>
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
