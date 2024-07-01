import ListAdminPage from "@/components/ListAdminPage";
import * as FirebaseSelfStorage from "@/services/firebase/client/selfstorage";
import { uploadFileViaJs } from "@/utils/uploadFileViaJs";
import { useCallback, useMemo, useState } from "react";
import { TbEye, TbTrash, TbUpload } from "react-icons/tb";
import { AddFileModal } from "../../../components/pages/admin/storage/AddFileModal/AddFileModal";

import dynamic from "next/dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

const ChangeVisibility = dynamic(() => import("../../../components/pages/admin/storage/ChangeVisibility/ChangeVisibility"), { ssr: false });

export default function Page() {
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showChangeVisibilityModal, setShowChangeVisibilityModal] = useState<string | null>(null);
  const files = FirebaseSelfStorage.useRealtimeListenFile();
  const list = files.map((file) => ({
    id: file.id,
    title: file.id,
    description: `Nome do Arquivo: ${file.filename} \nModificado em: ${formatDate(file.dateOfLastUpdate.toDate())}`,
  }));
  const removeFile = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este arquivo?");
    if (!confirm) return;
    await FirebaseSelfStorage.deleteFile(id);
  }, []);
  const reuploadFile = useCallback(async (id: string) => {
    const file = await uploadFileViaJs();
    if (file === null) return;
    FirebaseSelfStorage.reuploadFile(id, file)
      .then(() => {
        alert("Arquivo reenviado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao reenviar arquivo");
      });
  }, []);

  const changeVisibilityData = useMemo(() => {
    return files.find((file) => file.id === showChangeVisibilityModal) ?? null;
  }, [showChangeVisibilityModal, files]);

  return (
    <>
      <AddFileModal visible={showAddFileModal} close={() => setShowAddFileModal(!showAddFileModal)} />
      <ChangeVisibility close={() => setShowChangeVisibilityModal(null)} data={changeVisibilityData} />
      <ListAdminPage
        title="Gerenciado de Arquivos na Nuvem"
        addButtonText="Subir Arquivo"
        emptyListText="Sem arquivos"
        list={list}
        addButtonClick={() => setShowAddFileModal(!showAddFileModal)}
        listButtons={[
          {
            icon: () => TbEye,
            onClick: setShowChangeVisibilityModal,
          },
          {
            icon: () => TbUpload,
            onClick: reuploadFile,
          },
          {
            icon: () => TbTrash,
            onClick: removeFile,
          },
        ]}
      />
    </>
  );
}
