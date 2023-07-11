import { Button } from "@/components/Button";
import IconButton from "@/components/IconButon";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import styles from "./styles.module.css";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import Loader from "@/components/Loader";
import {
  deleteProject,
  listProjects,
} from "@/services/firebase/client/projects";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";

interface ProjectToList {
  id: string;
  name: string;
  image: string;
  imageBlur: string;
}

export default function Page() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectToList[]>();

  const loadProjects = useCallback(async () => {
    setProjects(await listProjects());
  }, []);

  useAdminAuthentication(() => {});

  const handleAddProject = useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/admin/projects/editor/new");
  }, [router, containerRef]);

  const handleDeleteProjectButton = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este projeto?");
    if (!confirm) return;
    await deleteProject(id);
    await revalidateNextPages("projects", id);
    setProjects((projects) => {
      return projects?.filter((project) => project.id !== id);
    });
  }, []);

  const editProject = useCallback(
    async (id: string) => {
      containerRef.current?.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/admin/projects/editor/${id}`);
    },
    [router, containerRef]
  );

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const memorizedCompoment = useMemo(() => {
    if (!projects) return <Loader />;

    if (projects.length === 0) return <h2>Nenhum projeto cadastrado</h2>;

    return projects.map((project) => (
      <li key={project.id}>
        <Image
          src={project.image}
          width={150}
          height={100}
          alt="Imagem do Projeto"
          placeholder="blur"
          blurDataURL={project.imageBlur}
        />
        <div className={styles.textArea}>
          <h2>{project.name}</h2>
        </div>
        <div className={styles.iconButtonsArea}>
          <IconButton
            icon={TbEdit}
            size={32}
            onClick={() => editProject(project.id)}
          />
          <IconButton
            icon={TbTrash}
            onClick={() => handleDeleteProjectButton(project.id)}
            size={32}
          />
        </div>
      </li>
    ));
  }, [projects, handleDeleteProjectButton, editProject]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerInside}>
        <Head>
          <title>Gerenciador de Projetos</title>
        </Head>
        <h1>Gerenciador de Projetos</h1>
        <Button onClick={handleAddProject}>Adicionar Projeto</Button>
        <ul className={styles.projectList}>{memorizedCompoment}</ul>
      </div>
    </div>
  );
}
