import { useCallback, useMemo, useState } from "react";
import { TbTrash, TbCopy } from "react-icons/tb";
import { deleteLink, listLinks } from "@/services/firebase/client/links";
import ListAdminPage from "@/components/ListAdminPage";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";

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
    alert("Link copiado para a área de transferência");
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
      ]}
      title="Gerenciador de Links Curtos"
      executeBeforeAuthenticated={loadLinks}
    />
  );
}
