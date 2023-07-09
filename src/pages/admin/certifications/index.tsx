import { Button } from "@/components/Button";
import IconButton from "@/components/IconButon";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import styles from "./styles.module.css";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import {
  deleteCertification,
  listCertifications,
} from "@/services/firebase/client/certificates";
import Loader from "@/components/Loader";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";

interface CertToList {
  id: string;
  name: string;
  institution: string;
  pdfThumbnail: string;
  pdfThumbnailBlur: string;
}


export default function Page() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [certs, setCerts] = useState<CertToList[]>();

  const loadCerts = useCallback(async () => {
    setCerts(await listCertifications());
  }, []);

  useAdminAuthentication((user) => {
    if (!user) {
      router.push("/admin");
    }
  });

  const handleAddCert = useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/admin/certifications/editor/new");
  }, [router, containerRef]);

  const deleteCert = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este certificado?");
    if (!confirm) return;
    await deleteCertification(id);
    await revalidateNextPages("certificates", id);
    setCerts((certs) => {
      return certs?.filter((cert) => cert.id !== id);
    });
  }, []);

  const editCert = useCallback(async (id: string) => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(`/admin/certifications/editor/${id}`);
  }, [router, containerRef]);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);

  const memorizedCompoment = useMemo(() => {
    if (!certs) return <Loader />;

    if (certs.length === 0) return <h2>Nenhum certificado cadastrado</h2>;

    return certs.map((cert) => (
      <li key={cert.id}>
        <Image
          src={cert.pdfThumbnail}
          width={150}
          height={100}
          alt="Imagem do Certificado"
          placeholder="blur"
          blurDataURL={cert.pdfThumbnailBlur}
        />
        <div className={styles.textArea}>
          <h2>{cert.name}</h2>
          <h3>{cert.institution}</h3>
        </div>
        <div className={styles.iconButtonsArea}>
          <IconButton icon={TbEdit} size={32} onClick={()=>editCert(cert.id)} />
          <IconButton
            icon={TbTrash}
            onClick={() => deleteCert(cert.id)}
            size={32}
          />
        </div>
      </li>
    ));
  }, [certs, deleteCert, editCert]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerInside}>
        <Head>
          <title>Gerenciador de Certificações</title>
        </Head>
        <h1>Gerenciador de Certificações</h1>
        <Button onClick={handleAddCert}>Adicionar Certificação</Button>
        <ul className={styles.certList}>{memorizedCompoment}</ul>
      </div>
    </div>
  );
}
