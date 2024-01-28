import Input from "@/components/Input";
import Image from "next/image";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { listCertifications } from "@/services/firebase/client/certificates";
import { useRouter } from "next/router";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import Link from "next/link";

interface Certificate {
  id: string;
  name: string;
  pdfThumbnail: string;
  keywords: string[];
  pdfThumbnailBlur: string;
}

interface Props {
  certificates: Certificate[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const certificates = await listCertifications();
  return {
    props: {
      certificates,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { certificates } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCertificates, setFilteredCertificates] =
    useState<Certificate[]>();
  const router = useRouter();
  const hidder = useRef<HTMLDivElement>(null);

  const handleClickCertificate: MouseEventHandler<HTMLAnchorElement> =
    useCallback(
      async (event) => {
        const href = event.currentTarget.href;
        event.preventDefault();
        hidder.current?.classList.add(styles.hide);
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(href);
      },
      [router]
    );

  const visibleCertificates = filteredCertificates || certificates;

  const memorizedComponent = useMemo(() => {
    return visibleCertificates.map((certificate) => (
      <Link
        href={`/certificate/${certificate.id}`}
        key={certificate.id}
        onClick={handleClickCertificate}
      >
        <li>
          <Image
            src={certificate.pdfThumbnail}
            width={300}
            height={200}
            alt={`Certificado de conclusão do curso de ${certificate.name}`}
            placeholder="blur"
            blurDataURL={certificate.pdfThumbnailBlur}
          />
          <div>{certificate.name}</div>
        </li>
      </Link>
    ));
  }, [visibleCertificates, handleClickCertificate]);

  useEffect(() => {
    if (searchTerm === "") return setFilteredCertificates(undefined);
    const terms = searchTerm
      .toLowerCase()
      .split(",")
      .map((term) => term.trim());
    const filteredCertificates = certificates.filter((certificate) => {
      const { keywords } = certificate;
      for (const keyword of keywords) {
        for (const term of terms) {
          if (keyword.toLowerCase().includes(term)) return true;
        }
      }
    });
    setFilteredCertificates(filteredCertificates);
  }, [certificates, searchTerm]);

  return (
    <div ref={hidder} className={styles.hidder}>
      <div className={styles.container}>
        <DefaultSeo
          title="Mural de Certificações"
          description="Mural de Certificações do Guilherme"
          image={getOpenMediaImageForNextSeo("Meus Certificados")}
          site_name="Site do Guilherme"
          type="website"
        />
        <div className={styles.header}>
          <h1>Mural de Certificações</h1>
          <Input
            boxClassName={styles.searchBox}
            type="text"
            placeholder="Procure por Linguagem ou Skill:"
            id="search"
            state={searchTerm}
            setState={setSearchTerm}
          />
        </div>
        <ul className={styles.certificatesList}>{memorizedComponent}</ul>
      </div>
    </div>
  );
}
