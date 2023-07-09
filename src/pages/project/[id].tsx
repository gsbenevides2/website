import { Button } from "@/components/Button";
import { useCallback } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./styles.module.css";
import Head from "next/head";
import { getProject, listProjects } from "@/services/firebase/client/projects";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { DefaultSeo } from "@/components/DefaultSeo";

interface Project {
  id: string;
  name: string;
  github?: string;
  descriptionDesktop: string;
  descriptionMobile: string;
  image: string;
  keywords: string[];
  imageBlur: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}
interface Props {
  project: Project;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const projects = await listProjects();
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { id } = context.params!;
  const project = await getProject(id);
  if (project == null)
    return {
      notFound: true,
    }
  return {
    props: {
      project,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { project } = props;

  const githubButtonClick = useCallback(() => {
    if (!project) return;
    if (!project.github) return;
    window.open(project.github, "_blank");
  }, [project]);

  if (!project) return null;

  return (
    <div className={styles.container} id="container">
      <DefaultSeo
        title={project.name}
        description={`Projeto ${project.name}`}
        image={{
          url: project.image,
          width: 800,
          height: 600,
        }}
        site_name="Site do Guilherme"
        type="website"
      />
      <h2>{project.name}</h2>
      <div className={styles.area1}>
        <div className={styles.image}>
          <Image
            src={project.image}
            alt="Image do projeto"
            fill
            placeholder="blur"
            blurDataURL={project.imageBlur}
          />
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionDesktop}>
            <ReactMarkdown>{project.descriptionDesktop}</ReactMarkdown>
          </div>
          <div className={styles.descriptionMobile}>
            <ReactMarkdown>{project.descriptionMobile}</ReactMarkdown>
          </div>
          <Button className={styles.viewMoreButton} onClick={githubButtonClick}>
            Ver no Github
          </Button>
        </div>
      </div>
    </div>
  );
}
