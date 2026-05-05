import { ButtonAnchor } from "@/components/Button";
import { DefaultSeo } from "@/components/DefaultSeo";
import PdfViewer from "@/components/PdfViewer";
import {
  getCertification,
  listCertifications,
} from "@/services/firebase/client/certificates";
import { parseDateObjcToDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import useLoadColor from "@/hooks/useLoadColor";
import styles from "./styles.module.scss";
import MyError from "@/utils/MyError";

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
      width?: number;
      height?: number;
    };
    colors?: {
      gradient: [string, string];
      text: "white" | "black";
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

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context,
) => {
  try {
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
  } catch (error) {
    if (error instanceof MyError) {
      if (error.code === "certificate-not-found") {
        return {
          notFound: true,
        };
      }
    }
    throw error;
  }
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { certificate } = props;

  const referenceButton = useMemo(() => {
    if (!certificate) return null;
    if (!certificate.externalReference) return null;
    return (
      <ButtonAnchor
        href={certificate.externalReference}
        target="_blank"
        className={styles.viewMoreButton}
      >
        Saiba Mais sobre o Curso
      </ButtonAnchor>
    );
  }, [certificate]);
  useLoadColor(
    certificate?.certificate.colors?.gradient,
    certificate?.certificate.colors?.text,
  );
  const certLoad = useCallback(() => {
    const img = document.getElementById("animatedImageZoom");
    if (img) img.remove();
  }, []);
  if (!certificate) return null;

  const fallback =
    props.certificate.certificate.pdf.height &&
    props.certificate.certificate.pdf.width
      ? {
          src: props.certificate.certificate.thumbnail.png,
          blur: props.certificate.certificate.thumbnail.blur,
          width: props.certificate.certificate.pdf.width,
          height: props.certificate.certificate.pdf.height,
        }
      : undefined;

  return (
    <div className={styles.containerCertification} id="container">
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
        canonical={
          process.env.NEXT_PUBLIC_DOMAIN + "/certificate/" + certificate.id
        }
        keywords={certificate.keywords.map((k) => k.toLowerCase())}
      />
      <h2>{certificate.name}</h2>
      <h3>{certificate.institution}</h3>
      <h4>Data de Conclusão: {certificate.date}</h4>
      <div className={styles.area1}>
        <div className={styles.pdf}>
          <PdfViewer
            file={certificate.certificate.pdf.file}
            fallback={fallback}
            onLoadSuccess={certLoad}
          />
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
