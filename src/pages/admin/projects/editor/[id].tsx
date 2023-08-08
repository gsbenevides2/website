import Input from "@/components/Input";
import Textarea from "@/components/TextArea";
import Head from "next/head";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import { ImageInput } from "@/components/ImageInput";
import {
  addOrUpdateProject,
  getProject,
  getProjectImageFile,
} from "@/services/firebase/client/projects";
import MyError from "@/utils/MyError";
import { fileToBase64, generateBlur } from "@/utils/imageManager";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import Loader from "@/components/Loader";

export default function Page() {
  const router = useRouter();
  const projectId =
    router.query.id === "new" ? undefined : (router.query.id as string);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [youtube, setYoutube] = useState("");
  const [descriptionDesktop, setDescriptionDesktop] = useState("");
  const [descriptionMobile, setDescriptionMobile] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [keywords, setKeywords] = useState("");

  useAdminAuthentication(() => {});

  const formSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!hidder.current) return;
      if (!loader.current) return;
      if (!image[0]) {
        alert("Selecione uma Imagem");
        return;
      }

      hidder.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const responseProjectId = await addOrUpdateProject({
        id: projectId,
        name: name,
        github: github,
        youtube: youtube,
        descriptionDesktop: descriptionDesktop,
        descriptionMobile: descriptionMobile,
        image: image[0],
        keywords: keywords.split(",").map((e) => e.trim()),
        imageBlur: await generateBlur(await fileToBase64(image[0])),
      });
      await revalidateNextPages("projects", responseProjectId);

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";

      router.push("/admin/projects");
    },
    [
      projectId,
      descriptionDesktop,
      descriptionMobile,
      github,
      youtube,
      keywords,
      name,
      image,
      router,
      hidder,
      loader,
    ]
  );

  const loadDocData = useCallback(async () => {
    if (!projectId) return;
    if (!loader.current) return;
    if (!hidder.current) return;
    hidder.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    loader.current.classList.add(styles.update);
    loader.current.classList.add(styles.show);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const project = await getProject(projectId);
      setName(project.name);
      if (project.github) setGithub(project.github);
      if (project.youtube) setYoutube(project.youtube);
      setDescriptionDesktop(project.descriptionDesktop);
      setDescriptionMobile(project.descriptionMobile);
      setKeywords(project.keywords.join(","));
      const imageFile = await getProjectImageFile(projectId);
      setImage([imageFile]);

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    } catch (e) {
      document.body.style.overflow = "auto";
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do projeto. Veja o console para detalhes!"
        );
        console.error(e);
      }
      router.push("/admin/projects");
    }
  }, [projectId, router, hidder, loader]);

  useEffect(() => {
    loadDocData();
  }, [loadDocData]);

  return (
    <>
      <div className={styles.hidder} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{projectId ? "Editar" : "Adicionar"} Projeto</title>
          </Head>
          <h1>{projectId ? "Editar" : "Adicionar"} Projeto</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <Input
              label="Nome do Projeto:"
              placeholder="Digite o Nome do Projeto"
              required
              state={name}
              setState={setName}
              id="name"
            />
            <Input
              label="Link para Github:"
              placeholder="Digite o link para o Github do projeto"
              state={github}
              setState={setGithub}
              id="github"
            />
            <Input
              label="Link do vídeo no Youtube:"
              placeholder="Digite o link para o vídeo no Youtube"
              state={youtube}
              setState={setYoutube}
              id="youtube"
            />
            <Textarea
              label="Descrição Desktop: (Markdown)"
              placeholder="Descrição Desktop (Markdown)"
              required
              className={styles.textarea}
              state={descriptionDesktop}
              setState={setDescriptionDesktop}
              id="descriptionDesktop"
            />
            <Textarea
              label="Descrição Mobile: (Markdown)"
              placeholder="Descrição Mobile (Markdown)"
              required
              className={styles.textarea}
              state={descriptionMobile}
              setState={setDescriptionMobile}
              id="descriptionMobile"
            />
            <ImageInput
              label="Selecione uma Image do Projeto"
              state={image}
              setState={setImage}
            />
            <Textarea
              label="Palavras Chave:"
              className={styles.textarea}
              placeholder="Digite as palavras chave separadas por vírgula"
              required
              state={keywords}
              setState={setKeywords}
              id="keywords"
            />
            <Button type="submit">Salvar Projeto</Button>
          </form>
        </div>
      </div>
      <div className={styles.loader} ref={loader}>
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
