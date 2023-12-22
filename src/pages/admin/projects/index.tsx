import { useCallback, useMemo, useState } from "react";
import { TbEdit, TbExternalLink, TbTrash } from "react-icons/tb";
import {
  deleteProject,
  listProjects,
} from "@/services/firebase/client/projects";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import ListAdminPage from "@/components/ListAdminPage";

interface ProjectToList {
  id: string;
  name: string;
  image: string;
  imageBlur: string;
}

export default function Page() {
  const [projects, setProjects] = useState<ProjectToList[]>();

  const loadProjects = useCallback(async () => {
    setProjects(await listProjects());
  }, []);

  const handleDeleteProjectButton = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este projeto?");
    if (!confirm) return;
    await deleteProject(id);
    await revalidateNextPages("projects", id);
    setProjects((projects) => {
      return projects?.filter((project) => project.id !== id);
    });
  }, []);
  const openProject = useCallback(async (id: string) => {
    window.open("/project/" + id);
  }, []);

  const list = useMemo(() => {
    return projects?.map((project) => ({
      id: project.id,
      title: project.name,
      image: project.image,
      blurImage: project.imageBlur,
      altImage: "Imagem do Projeto: " + project.name,
      description: "",
    }));
  }, [projects]);

  return (
    <ListAdminPage
      addButtonText="Adicionar Projeto"
      addButtonClick={() => "/admin/projects/editor/new"}
      emptyListText="Nenhum projeto cadastrado"
      title="Gerenciador de Projetos"
      list={list}
      executeBeforeAuthenticated={loadProjects}
      listButtons={[
        {
          icon: () => TbEdit,
          onClick: (id) => `/admin/projects/editor/${id}`,
          hideOnClicked: true,
        },
        {
          icon: () => TbTrash,
          onClick: handleDeleteProjectButton,
        },
        {
          icon: () => TbExternalLink,
          onClick: openProject,
        },
      ]}
    ></ListAdminPage>
  );
}
