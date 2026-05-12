import ListAdminPage, { ListItem } from "@/components/ListAdminPage";
import * as cmsClient from "@/services/firebase/client/cms";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import router from "next/router";
import { useCallback, useMemo, useState } from "react";
import { TbEdit, TbTrash, TbVersions } from "react-icons/tb";

export default function CMS() {
  const [pages, setPages] = useState<ListItem[] | undefined>(undefined);

  const loadPages = useCallback(async () => {
    const pages = await cmsClient.listPages();
    setPages(
      pages.docs.map((page) => ({
        id: page.id,
        title: page.data().name,
        description: page.data().description,
      })),
    );
  }, []);

  const deletePage = useCallback(
    async (id: string) => {
      await cmsClient.deletePage(id);
      loadPages();
    },
    [loadPages],
  );

  const editPage = useCallback((id: string) => {
    router.push(`/admin/cms/pages/${id}`);
  }, []);

  const editVersion = useCallback((id: string) => {
    router.push(`/admin/cms/pages/${id}/versions`);
  }, []);

  return (
    <ListAdminPage
      addButtonClick={() => "/admin/cms/pages/new"}
      list={pages}
      addButtonText="Adicionar Página"
      emptyListText="Nenhuma página cadastrada"
      listButtons={useMemo(
        () => [
          {
            icon: () => TbEdit,
            onClick: editPage,
          },
          {
            icon: () => TbTrash,
            onClick: deletePage,
          },
          {
            icon: () => TbVersions,
            onClick: editVersion,
          },
        ],
        [deletePage, editPage, editVersion],
      )}
      title="CMS Páginas"
      seoProps={{
        site_name: "Site do Guilherme",
        title: "Administração de Páginas do CMS",
        description:
          "Gerencie as páginas do CMS do site do Guilherme. Adicione, edite ou exclua páginas para manter o conteúdo atualizado e relevante para os visitantes.",
        keywords: [
          "administração",
          "cms",
          "páginas",
          "gerenciamento",
          "guilherme benevides",
        ],
        image: getOpenMediaImageForNextSeo("Administração de Páginas do CMS"),
        noFollow: true,
        canonical: process.env.NEXT_PUBLIC_DOMAIN + "/admin/cms/pages",
        noIndex: true,
      }}
      executeBeforeAuthenticated={loadPages}
    />
  );
}
