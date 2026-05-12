import ListAdminPage from "@/components/ListAdminPage";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import {
  deleteCertification,
  listCertifications,
} from "@/services/firebase/client/certificates";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";

interface CertToList {
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

export default function Page() {
  const [certs, setCerts] = useState<CertToList[]>();

  const loadCerts = useCallback(async () => {
    setCerts(await listCertifications());
  }, []);

  const deleteCert = useCallback(async (id: string) => {
    const confirm = window.confirm(
      "Deseja realmente excluir este certificado?",
    );
    if (!confirm) return;
    await deleteCertification(id);
    await revalidateNextPages("certificates", id);
    setCerts((certs) => {
      return certs?.filter((cert) => cert.id !== id);
    });
  }, []);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);
  const list = useMemo(() => {
    return certs?.map((cert) => ({
      id: cert.id,
      title: cert.name,
      description: cert.institution,
      image: cert.certificate.thumbnail.png,
      blurImage: cert.certificate.thumbnail.blur,
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
      seoProps={{
        site_name: "Site do Guilherme",
        title: "Administração das Certificações do Guilherme",
        description:
          "Gerencie os certificados do site do Guilherme. Crie, edite, exclua e altere a visibilidade dos certificados.",
        keywords: [
          "administração",
          "certificações",
          "certificados",
          "gerenciamento",
          "guilherme benevides",
        ],
        image: getOpenMediaImageForNextSeo(
          "Administração das Certificações do Guilherme",
        ),
        noFollow: true,
        canonical: process.env.NEXT_PUBLIC_DOMAIN + "/admin/certifications",
        noIndex: true,
      }}
    />
  );
}
