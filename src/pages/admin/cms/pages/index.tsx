import ListAdminPage, { ListItem } from "@/components/ListAdminPage";
import * as cmsClient from "@/services/firebase/client/cms";
import router from "next/router";
import { useCallback, useMemo, useState } from "react";
import { TbEdit, TbTrash, TbVersions } from "react-icons/tb";

export default function CMS() {
    const [pages, setPages] = useState<ListItem[]>([]);

    const loadPages = useCallback(async () => {
        const pages = await cmsClient.listPages();
        setPages(pages.docs.map((page) => ({
            id: page.id,
            title: page.data().name,
            description: page.data().description,
        })));
    }, []);

    const deletePage = useCallback(async (id: string) => {
        await cmsClient.deletePage(id);
        loadPages();
    }, [loadPages]);

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
            listButtons={useMemo(() => [
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
            ], [deletePage, editPage])}
            title="CMS Páginas"
            executeBeforeAuthenticated={loadPages}
        />
    );
}
