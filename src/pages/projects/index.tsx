import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { listProjects } from "@/services/firebase/client/projects";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { DefaultSeo } from "@/components/DefaultSeo";

interface Project {
  id: string;
  name: string;
  image: string;
  keywords: string[];
  imageBlur: string;
}

interface Props {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await listProjects();
  return {
    props: {
      projects,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { projects } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>();
  const router = useRouter();
  const hidder = useRef<HTMLDivElement>(null);

  const handleClickProject = useCallback(
    async (projectId: string) => {
      hidder.current?.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/project/${projectId}`);
    },
    [router]
  );

  const memorizedComponent = useMemo(() => {
    if (filteredProjects)
      return filteredProjects.map((project) => (
        <li
          key={project.id}
          onClick={() => {
            handleClickProject(project.id);
          }}
        >
          <Image
            src={project.image}
            width={300}
            height={200}
            alt={`Imagem do projeto ${project.name}`}
            placeholder="blur"
            blurDataURL={project.imageBlur}
          />
          <div>{project.name}</div>
        </li>
      ));
    else
      return projects.map((project) => (
        <li
          key={project.id}
          onClick={() => {
            handleClickProject(project.id);
          }}
        >
          <Image
            src={project.image}
            width={300}
            height={200}
            alt={`Imagem do projeto ${project.name}`}
            placeholder="blur"
            blurDataURL={project.imageBlur}
          />
          <div>{project.name}</div>
        </li>
      ));
  }, [projects, filteredProjects, handleClickProject]);

  useEffect(() => {
    if (searchTerm === "") return setFilteredProjects(undefined);
    const terms = searchTerm
      .toLowerCase()
      .split(",")
      .map((term) => term.trim());
    const filteredProjects = projects.filter((project) => {
      const { keywords } = project;
      for (const keyword of keywords) {
        for (const term of terms) {
          if (keyword.toLowerCase().includes(term)) return true;
        }
      }
    });
    setFilteredProjects(filteredProjects);
  }, [projects, searchTerm]);

  return (
    <div ref={hidder} className={styles.hidder}>
      <div className={styles.container}>
        <DefaultSeo
          title="Mural de Projetos"
          description="Mural de Projetos do Guilherme"
          image={getOpenMediaImageForNextSeo("Mural de Projetos")}
          site_name="Site do Guilherme"
          type="website"
        />
        <div className={styles.header}>
          <h1>Mural de Projetos</h1>
          <Input
            boxClassName={styles.searchBox}
            type="text"
            placeholder="Procure por Linguagem ou Skill:"
            id="search"
            state={searchTerm}
            setState={setSearchTerm}
          />
        </div>
        <ul className={styles.projectsList}>{memorizedComponent}</ul>
      </div>
    </div>
  );
}
