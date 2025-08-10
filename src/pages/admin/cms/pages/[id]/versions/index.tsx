import ListAdminPage, { ListItem } from "@/components/ListAdminPage";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import * as cmsClient from "@/services/firebase/client/cms";
import { Timestamp } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { TbArrowUp, TbCode } from "react-icons/tb";

const ViewVersionModal = dynamic(
    () =>
        import(
            "@/components/pages/admin/cms/ViewVersionModal/ViewVersionModal"
        ),
    {
        ssr: false,
    },
);

export default function Versions() {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const [versions, setVersions] = useState<ListItem[]>([]);
    const [showViewJsonModal, setShowViewJsonModal] = useState<string | null>(
        null,
    );

    const loadVersions = useCallback(async () => {
        const versions = await cmsClient.listVersions(id);
        const page = await cmsClient.getPage(id);
        const pageData = page.data();
        const formatDate = (date: Timestamp) => {
            const dateObj = date.toDate();
            return dateObj.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        };
        setVersions(versions.docs.map((version) => ({
            id: version.id,
            title: formatDate(version.data().createdAt),
            description: version.id === pageData?.latestVersion
                ? "Versão atual"
                : "Versão anterior",
        })));
    }, [id]);

    const setLatestVersion = useCallback(async (versionId: string) => {
        const page = await cmsClient.getPage(id);
        const pageData = page.data();
        if (pageData) {
            await cmsClient.updateLatestVersion(id, versionId);
            await revalidateNextPages("cms", `${pageData.path}`);
        }
        loadVersions();
    }, [loadVersions, id]);

    const viewVersionJson = useCallback((versionId: string) => {
        setShowViewJsonModal(versionId);
    }, []);

    return (
        <>
            <ViewVersionModal
                visible={showViewJsonModal !== null}
                close={() => setShowViewJsonModal(null)}
                pageId={id}
                versionId={showViewJsonModal}
            />
            <ListAdminPage
                addButtonClick={() => `/admin/cms/pages/${id}/versions/new`}
                list={versions}
                addButtonText="Adicionar Versão"
                emptyListText="Nenhuma versão cadastrada"
                listButtons={useMemo(() => [
                    {
                        icon: () => TbCode,
                        onClick: viewVersionJson,
                    },
                    {
                        icon: () => TbArrowUp,
                        onClick: setLatestVersion,
                    },
                ], [viewVersionJson, setLatestVersion])}
                title="Versões da Página"
                executeBeforeAuthenticated={loadVersions}
            />
        </>
    );
}
