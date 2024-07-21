import { ButtonAnchor } from "@/components/Button";
import { DefaultSeo } from "@/components/DefaultSeo";
import { getCertification, listCertifications } from "@/services/firebase/client/certificates";
import { parseDateObjcToDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "../project/styles.module.css";

interface Certification {
  id: string;
  name: string;
  institution: string;
  date: string;
  externalReference?: string;
  description: {
    desktop: string;
    mobile: string;
  };
  certificate: {
    pdf: {
      file: string;
    };
    thumbnail: {
      png: string;
      blur: string;
    };
  };
  keywords: string[];
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

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
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

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { certificate } = props;
  const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
    ssr: false,
  });
  const referenceButton = useMemo(() => {
    if (!certificate) return null;
    if (!certificate.externalReference) return null;
    return (
      <ButtonAnchor href={certificate.externalReference} target="_blank" className={styles.viewMoreButton}>
        Saiba Mais sobre o Curso
      </ButtonAnchor>
    );
  }, [certificate]);

  if (!certificate) return null;

  return (
    <div className={styles.container} id="container">
      <DefaultSeo
        title={certificate.name}
        description={`Certificado de ${certificate.name} emitido pela instituição ${certificate.institution}`}
        image={{
          url: certificate.certificate.thumbnail.png,
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
          <PdfViewer file={certificate.certificate.pdf.file} />
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionDesktop}>
            <ReactMarkdown>{certificate.description.desktop}</ReactMarkdown>
          </div>
          <div className={styles.descriptionMobile}>
            <ReactMarkdown>{certificate.description.mobile}</ReactMarkdown>
          </div>
          {referenceButton}
        </div>
      </div>
    </div>
  );
}
