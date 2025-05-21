import { DefaultSeo } from "@/components/DefaultSeo";
import Input from "@/components/Input";
import { listCertifications } from "@/services/firebase/client/certificates";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    pdf: {
      width: number | null;
      height: number | null;
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

interface Dimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

function updateImageToScale(size: number | string, scale: number) {
  const sizeNumber = typeof size === "string" ? parseFloat(size) : size;
  return sizeNumber * scale;
}

function calculateAnimateImageToDesktop(width: number, height: number, headerHeight: number): Dimensions {
  const y = 12 + 44 + 12 + headerHeight;
  const base = window.innerWidth > 1640 ? 800 : (800 * window.innerWidth) / 1640;
  let x = 0;

  if (window.innerWidth <= 1640 && width >= 800) x = 20;
  if (window.innerWidth > 1640 && width >= 800) x = (window.innerWidth - 1600) / 2;
  if (window.innerWidth > 1640 && width < 800) {
    const initialPos = (window.innerWidth - 1600) / 2;
    const diff = 800 - width;
    const halfDiff = diff / 2;
    x = initialPos + halfDiff;
  }
  if (window.innerWidth <= 1600 && width < 800) {
    const size = window.innerWidth - 40;
    const page = size / 2;
    console.log({ size, page, width });
    if (width >= page) x = 20;
    else {
      const diff = (page - width) / 2;
      const initialPos = 20;
      x = initialPos + diff;
    }
  }

  console.log({ x });
  if (width <= base) return { width, height, x, y };

  const scale = base / width;
  let newWidth = updateImageToScale(width, scale);
  let newHeight = updateImageToScale(height, scale);
  if (window.innerWidth <= 1600) {
    const size = window.innerWidth - 40;
    const page = size / 2;
    if (width >= page) {
      newWidth = page;
      newHeight = (height * page) / width;
    }
  }

  return { width: newWidth, height: newHeight, x, y };
}

function calculateAnimateImageToMobile(width: number, height: number, headerHeight: number): Dimensions {
  const imageWidth = window.innerWidth - 40;
  const y = 12 + 44 + 12 + headerHeight;
  const newHeight = updateImageToScale(height, imageWidth / width);
  return { width: imageWidth, height: newHeight, x: 20, y };
}

function getCurrentImageDimensions(image: HTMLImageElement): Dimensions {
  const { width, height, x, y } = image.getBoundingClientRect();
  return { width, height, x, y };
}

function createAnimatedImageAndRun(event: MouseEvent<HTMLAnchorElement>, certificates: Certificate[], fallback: () => void, hidder: React.RefObject<HTMLDivElement | null>) {
  const animatedImage = document.createElement("img");
  const img = event.currentTarget.querySelector("img");
  const certificateFindResult = certificates.find((certificate) => certificate.id === event.currentTarget.dataset.certificateId);
  if (!img || !certificateFindResult) return fallback();
  const {
    certificate: { pdf: certificateFile },
  } = certificateFindResult;
  if (certificateFile.width === null || certificateFile.height === null) return fallback();

  const sourceDimensions = getCurrentImageDimensions(img);
  const headerHeight = renderHeaderToVirtualCalculation(event, certificates) || 0;
  const destinationDimensions = window.innerWidth > 798 ? calculateAnimateImageToDesktop(certificateFile.width, certificateFile.height, headerHeight) : calculateAnimateImageToMobile(certificateFile.width, certificateFile.height, headerHeight);

  animatedImage.src = img.src;

  animatedImage.style.width = `${sourceDimensions.width}px`;
  animatedImage.style.height = `${sourceDimensions.height}px`;
  animatedImage.style.left = `${sourceDimensions.x}px`;
  animatedImage.style.top = `${sourceDimensions.y}px`;
  animatedImage.style.position = "fixed";
  animatedImage.style.transition = "all 0.5s ease-in-out";
  animatedImage.id = "animatedImageZoom";

  animatedImage.onload = async () => {
    img.style.opacity = "0";
    await new Promise((resolve) => setTimeout(resolve, 100));
    hidder.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    animatedImage.style.width = `${destinationDimensions.width}px`;
    animatedImage.style.height = `${destinationDimensions.height}px`;
    animatedImage.style.left = `${destinationDimensions.x}px`;
    animatedImage.style.top = `${destinationDimensions.y}px`;
    await new Promise((resolve) => setTimeout(resolve, 500));
    fallback();
  };

  animatedImage.onerror = fallback;

  document.body.appendChild(animatedImage);
}

function renderHeaderToVirtualCalculation(event: MouseEvent<HTMLAnchorElement>, certificates: Certificate[]) {
  const certificateFindResult = certificates.find((certificate) => certificate.id === event.currentTarget.dataset.certificateId);
  if (!certificateFindResult) return;
  const { name, institution } = certificateFindResult;
  const div = document.createElement("div");
  //div.style.opacity = "0";
  div.style.position = "absolute";
  div.style.paddingTop = "20px";
  div.style.paddingLeft = "20px";
  div.style.paddingRight = "20px";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "100%";
  div.style.opacity = "0";
  const h2 = document.createElement("h2");
  h2.textContent = name;
  const h3 = document.createElement("h3");
  h3.textContent = institution;
  const h4 = document.createElement("h4");
  h4.textContent = "Data de Conclusão: 12/12/2021";
  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(h4);
  document.getElementsByTagName("main").item(0)?.appendChild(div);
  const { height } = div.getBoundingClientRect();
  div.remove();
  return height;
}

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
      const fallback = async () => {
        hidder.current?.classList.add(styles.hide);
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(href);
      };
      event.preventDefault();
      createAnimatedImageAndRun(event, certificates, fallback, hidder);
    },
    [certificates, router]
  );

  const visibleCertificates = filteredCertificates || certificates;

  const memorizedComponent = useMemo(() => {
    return visibleCertificates.map((certificate) => (
      <Link href={`/certificate/${certificate.id}`} key={certificate.id} onClick={handleClickCertificate} data-certificate-id={certificate.id}>
        <li>
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
    <>
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
    </>
  );
}
