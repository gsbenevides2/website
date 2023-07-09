import { Button } from "@/components/Button";
import {
  getCertification,
  listCertifications,
} from "@/services/firebase/client/certificates";
import { useCallback } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./styles.module.css";
import { parseDateObjcToDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { DefaultSeo } from "@/components/DefaultSeo";
import dynamic from "next/dynamic";

interface Certification {
  id: string;
  name: string;
  institution: string;
  date: string;
  externalReference?: string;
  descriptionDesktop: string;
  descriptionMobile: string;
  pdf: string;
  keywords: string[];
  pdfThumbnail: string;
  pdfThumbnailBlur: string;
}
interface Props {
  certificate: Certification;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const certificates = await listCertifications();
  const paths = certificates.map((certificate) => ({
    params: { id: certificate.id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const certificate = await getCertification(id);
  if (certificate == null)
    return {
      notFound: true,
    };
  return {
    props: {
      certificate: {
        ...certificate,
        date: parseDateObjcToDDMMYYYY(certificate.date),
      },
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { certificate } = props;
  const PdfViewer= dynamic(() => import("@/components/PdfViewer"), {
    ssr: false,
  });
  const referenceButtonClick = useCallback(() => {
    if (!certificate) return;
    if (!certificate.externalReference) return;
    window.open(certificate.externalReference, "_blank");
  }, [certificate]);

  if (!certificate) return null;

  return (
    <div className={styles.container} id="container">
      <DefaultSeo
        title={certificate.name}
        description={`Certificado de ${certificate.name} emitido pela instituição ${certificate.institution}`}
        image={{
          url: certificate.pdfThumbnail,
          width: 800,
          height: 600,
        }}
        site_name="Site do Guilherme"
        type="website"
      />
      <h2>{certificate.name}</h2>
      <h3>{certificate.institution}</h3>
      <h4>Data de Conclusão: {certificate.date}</h4>
      <div className={styles.area1}>
        <div className={styles.pdf}>
          <PdfViewer file={certificate.pdf} />
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionDesktop}>
            <ReactMarkdown>{certificate.descriptionDesktop}</ReactMarkdown>
          </div>
          <div className={styles.descriptionMobile}>
            <ReactMarkdown>{certificate.descriptionMobile}</ReactMarkdown>
          </div>
          <Button
            className={styles.viewMoreButton}
            onClick={referenceButtonClick}
          >
            Saiba Mais sobre o Curso
          </Button>
        </div>
      </div>
    </div>
  );
}
