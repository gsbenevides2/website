import { DefaultSeo } from "@/components/DefaultSeo";
import Input from "@/components/Input";
import { listCertifications } from "@/services/firebase/client/certificates";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "./styles.module.css";

interface Certificate {
  id: string;
  name: string;
  institution: string;
  keywords: string[];
  certificate: {
    thumbnail: {
      png: string;
      blur: string;
    };
  };
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

function updateImageToScale(size: number | string, scale: number) {
  const sizeNumber = typeof size === "string" ? parseFloat(size) : size;
  return sizeNumber * scale;
}

const exempleSizes = {
  width: 800,
  height: 565.88,
  x: 159.5,
  y: 200,
};

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { certificates } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>();
  const router = useRouter();
  const hidder = useRef<HTMLDivElement>(null);

  const handleClickCertificate: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (event) => {
      const currentTarget = event.currentTarget;
      const href = currentTarget.href;
      event.preventDefault();
      const img = currentTarget.querySelector("img");
      if (!img) return;
      const imageAnimated = document.createElement("img");

      const renderedImageWidthString = getComputedStyle(img).width;
      const renderedImageHeightString = getComputedStyle(img).height;
      const imageX = img.getBoundingClientRect().x;
      const imageY = img.getBoundingClientRect().y;

      imageAnimated.style.width = updateImageToScale(renderedImageWidthString, 1.1).toString() + "px";
      imageAnimated.style.height = updateImageToScale(renderedImageHeightString, 1.1).toString() + "px";
      imageAnimated.style.left = imageX.toString() + "px";
      imageAnimated.style.top = imageY.toString() + "px";
      /*
    
      if (!img) return;
      const desiredImageSizes = {
        width: 800,
        height: 566,
      };
      img.setAttribute("width", desiredImageSizes.width.toString() + "px");
      img.setAttribute("height", desiredImageSizes.height.toString() + "px");
      */
      imageAnimated.src = img.src;
      imageAnimated.classList.add(styles.imageAnimation);
      imageAnimated.onload = async () => {
        hidder.current?.classList.add(styles.hide);
        await new Promise((resolve) => setTimeout(resolve, 500));
        imageAnimated.style.width = exempleSizes.width.toString() + "px";
        imageAnimated.style.height = exempleSizes.height.toString() + "px";
        imageAnimated.style.left = exempleSizes.x.toString() + "px";
        imageAnimated.style.top = exempleSizes.y.toString() + "px";
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(href);
      };
      document.body.appendChild(imageAnimated);
      /*
      hidder.current?.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(href);
      */
    },
    [router]
  );

  const visibleCertificates = filteredCertificates || certificates;

  const memorizedComponent = useMemo(() => {
    return visibleCertificates.map((certificate) => (
      <Link href={`/certificate/${certificate.id}`} key={certificate.id} onClick={handleClickCertificate}>
        <li data-certificate-id={certificate.id}>
          <div className={styles.imageContainer}>
            <Image src={certificate.certificate.thumbnail.png} width={300} height={200} alt={`Certificado de conclusão do curso de ${certificate.name}`} placeholder="blur" blurDataURL={certificate.certificate.thumbnail.blur} className={styles.defaultImage} />
          </div>
          <div className={styles.certificateText}>{certificate.name}</div>
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
        <DefaultSeo title="Mural de Certificações" description="Mural de Certificações do Guilherme" image={getOpenMediaImageForNextSeo("Meus Certificados")} site_name="Site do Guilherme" type="website" />
        <div className={styles.header}>
          <h1>Mural de Certificações</h1>
          <Input boxClassName={styles.searchBox} type="text" placeholder="Procure por Linguagem ou Skill:" id="search" state={searchTerm} setState={setSearchTerm} />
        </div>
        <ul className={styles.certificatesList}>{memorizedComponent}</ul>
      </div>
    </div>
  );
}
