import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import styles from "./styles.module.css";
import {
  deleteCertification,
  listCertifications,
} from "@/services/firebase/client/certificates";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import ListAdminPage from "@/components/ListAdminPage";

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

  const deleteCert = useCallback(async (id: string) => {
    const confirm = window.confirm(
      "Deseja realmente excluir este certificado?"
    );
    if (!confirm) return;
    await deleteCertification(id);
    await revalidateNextPages("certificates", id);
    setCerts((certs) => {
      return certs?.filter((cert) => cert.id !== id);
    });
  }, []);

  const editCert = useCallback(
    async (id: string) => {
      containerRef.current?.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/admin/certifications/editor/${id}`);
    },
    [router, containerRef]
  );

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);
  const list = useMemo(() => {
    return certs?.map((cert) => ({
      id: cert.id,
      title: cert.name,
      description: cert.institution,
      image: cert.pdfThumbnail,
      blurImage: cert.pdfThumbnailBlur,
      altImage: "Image do Certificado: " + cert.name,
    }));
  }, [certs]);

  return (
    <ListAdminPage
      addButtonClick={() => "/admin/certifications/editor/new"}
      list={list}
      listButtons={[
        {
          icon: () => TbEdit,
          onClick: (id) => `/admin/certifications/editor/${id}`,
          hideOnClicked: true,
        },
        {
          icon: () => TbTrash,
          onClick: deleteCert,
        },
      ]}
      addButtonText="Novo Certificado"
      emptyListText="Nenhum certificado cadastrado"
      addButtonHideOnClicked
      title="Gerenciador de Certificações"
      executeBeforeAuthenticated={loadCerts}
    />
  );
}
