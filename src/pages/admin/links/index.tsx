import ListAdminPage from "@/components/ListAdminPage";
import { toast } from "@/utils/toast";
import { deleteLink, listLinks } from "@/services/firebase/client/links";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import { useCallback, useMemo, useState } from "react";
import { TbCopy, TbGraph, TbTrash } from "react-icons/tb";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

interface LinkToList {
  id: string;
  url: string;
}

export default function Page() {
  const [links, setLinks] = useState<LinkToList[]>();

  const loadLinks = useCallback(async () => {
    setLinks(await listLinks());
  }, []);

  const handleDeleteLink = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este link?");
    if (!confirm) return;
    await deleteLink(id);

    setLinks((links) => {
      return links?.filter((link) => link.id !== id);
    });
  }, []);
  const handleCopyLink = useCallback(async (id: string) => {
    const link = new URL(window.location.href);
    link.pathname = `/l/${id}`;
    await copyTextToClipboard(link.toString());
    toast.success("Link copiado para a área de transferência");
  }, []);

  const handleCopyLinkWithAnalytics = useCallback(async (id: string) => {
    const link = new URL(window.location.href);
    link.pathname = `/la/${id}`;
    await copyTextToClipboard(link.toString());
    toast.success("Link copiado com analytics para a área de transferência");
  }, []);

  const list = useMemo(() => {
    return links?.map((link) => ({
      id: link.id,
      title: `/l/${link.id}`,
      description: link.url,
    }));
  }, [links]);

  return (
    <ListAdminPage
      addButtonClick={() => "/admin/links/editor/new"}
      list={list}
      addButtonText="Adicionar Link"
      emptyListText="Nenhum link cadastrado"
      listButtons={[
        {
          icon: () => TbTrash,
          onClick: handleDeleteLink,
        },
        {
          icon: () => TbCopy,
          onClick: handleCopyLink,
        },
        {
          icon: () => TbGraph,
          onClick: handleCopyLinkWithAnalytics,
        },
      ]}
      title="Gerenciador de Links Curtos"
      executeBeforeAuthenticated={loadLinks}
      seoProps={{
        site_name: "Site do Guilherme",
        title: "Administração dos Links Curtos do Guilherme",
        description:
          "Gerencie os links curtos do site do Guilherme. Crie, exclua, copie e adicione analytics aos links.",
        keywords: [
          "administração",
          "links",
          "links curtos",
          "gerenciamento",
          "guilherme benevides",
        ],
        image: getOpenMediaImageForNextSeo(
          "Administração dos Links Curtos do Guilherme",
        ),
        noFollow: true,
        canonical: process.env.NEXT_PUBLIC_DOMAIN + "/admin/links",
        noIndex: true,
      }}
    />
  );
}
