import { ButtonAnchor } from "@/components/Button";
import { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "./styles.module.css";
import { getProject, listProjects } from "@/services/firebase/client/projects";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { DefaultSeo } from "@/components/DefaultSeo";
import { getIframeYoutubeUrl } from "@/utils/getYoutubeIframeUrl";

interface Project {
  id: string;
  name: string;
  github?: string;
  youtube?: string;
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
    };
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

  const githubButton = useMemo(() => {
    if (!project) return null;
    if (!project.github) return null;
    return (
      <ButtonAnchor
        className={styles.viewMoreButton}
        href={project.github}
        target="_blank"
      >
        Ver no Github
      </ButtonAnchor>
    );
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
          {project.youtube ? (
            <iframe
              width="100%"
              height="100%"
              src={getIframeYoutubeUrl(project.youtube)}
              title="YouTube video player"
              frameBorder="0"
              className={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          ) : (
            <Image
              src={project.image}
              alt="Image do projeto"
              fill
              placeholder="blur"
              blurDataURL={project.imageBlur}
            />
          )}
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionDesktop}>
            <ReactMarkdown>{project.descriptionDesktop}</ReactMarkdown>
          </div>
          <div className={styles.descriptionMobile}>
            <ReactMarkdown>{project.descriptionMobile}</ReactMarkdown>
          </div>
          {githubButton}
        </div>
      </div>
    </div>
  );
}
