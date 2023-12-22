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
import { parseYYYYMMDDtoDateObjc } from "@/utils/parseDateStringtoDateObj";
import MyError from "@/utils/MyError";
import TextArea from "@/components/TextArea";
import { ImageInput } from "@/components/ImageInput";
import AssetsInput from "@/components/AssetsInput";
import Loader from "@/components/Loader";

import {
  base64ToFile,
  convertImageToWebP,
  fileToBase64,
  generateBlur,
  getMimeType,
  getSizeOfImage,
  resizeImage,
} from "@/utils/imageManager";
import { createOrUpdatePost, getPost } from "@/services/firebase/client/posts";

interface Asset {
  altText: string;
  file: File;
}

async function verifyThumbnails(original: File): Promise<boolean> {
  const base64 = await fileToBase64(original);
  const fileType = getMimeType(base64);
  console.log(fileType);
  if (fileType !== "image/png") return false;
  const sizes = await getSizeOfImage(base64);
  console.log(sizes);
  if (sizes.width !== 1000) return false;
  if (sizes.height !== 667) return false;
  return true;
}

interface GeneratedThumbnails {
  originalPng: File;
  originalWebp: File;
  metaTag: File;
  list: File;
  blur: string;
}

async function generateBlogThumbnails(
  original: File
): Promise<GeneratedThumbnails> {
  const originalPng = original;
  const base64Original = await fileToBase64(original);
  const webpOriginalBase64 = await convertImageToWebP(base64Original);
  const originalWebp = base64ToFile(webpOriginalBase64, "original.webp");
  const metaTagBase64 = await resizeImage(base64Original, {
    width: 500,
    height: 334,
  });
  const metaTag = base64ToFile(metaTagBase64, "metaTag.png");
  const listBase64 = await convertImageToWebP(metaTagBase64);
  const list = base64ToFile(listBase64, "list.webp");
  const blur = await generateBlur(base64Original);
  return {
    originalPng,
    originalWebp,
    metaTag,
    list,
    blur,
  };
}

interface GeneratedAssets {
  alt: string;
  blur: string;
  name: string;
  type: string;
  file: File;
}

async function generateAssets(assets: Asset[]): Promise<GeneratedAssets[]> {
  const generatedAssets: GeneratedAssets[] = [];
  for (const asset of assets) {
    const base64 = await fileToBase64(asset.file);
    const blur = await generateBlur(base64);
    generatedAssets.push({
      alt: asset.altText,
      blur,
      name: asset.file.name,
      type: asset.file.type,
      file: asset.file,
    });
  }
  return generatedAssets;
}

async function downloadFile(
  url: string,
  name: string,
  type: string
): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], name, { type });
  return file;
}

export default function Page() {
  const router = useRouter();
  const postId =
    router.query.id === "new" ? undefined : (router.query.id as string);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [thumbnail, setThumbnail] = useState<File[]>([]);
  const [thumbnailAltText, setThumbnailAltText] = useState("");
  const [content, setContent] = useState("");
  const [assents, setAssents] = useState<Asset[]>([]);

  const formSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!hidder.current) return;
      if (!loader.current) return;
      if (!thumbnail[0]) {
        alert("Selecione uma imagem para thumbnail");
        return;
      }
      if (!(await verifyThumbnails(thumbnail[0]))) {
        alert("A imagem da thumbnail deve ser PNG e ter 1000x667");
        return;
      }

      hidder.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const generatedThumbnails = await generateBlogThumbnails(thumbnail[0]);
      console.log(generatedThumbnails);
      const generatedAssets = await generateAssets(assents);
      console.log(generatedAssets);

      await createOrUpdatePost({
        id: postId,
        name,
        description,
        date: parseYYYYMMDDtoDateObjc(date),
        content,
        thumbnail: {
          ...generatedThumbnails,
          alt: thumbnailAltText,
        },
        assets: generatedAssets,
      });

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
      router.push("/admin/blog");
    },
    [
      thumbnail,
      assents,
      postId,
      name,
      description,
      date,
      content,
      thumbnailAltText,
      router,
    ]
  );

  const loadDocData = useCallback(async () => {
    if (!postId) return;
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
      const post = await getPost(postId);
      if (!post) throw new MyError("Post não encontrado");
      setName(post.name);
      setDescription(post.description);
      console.log(post.date);
      setDate(post.date);
      setContent(post.content);
      const thumbnail = await downloadFile(
        post.thumbnail.originalPng,
        "thumbnail.png",
        "image/png"
      );
      setThumbnail([thumbnail]);
      setThumbnailAltText(post.thumbnail.alt);
      const assets: Asset[] = [];
      for (const asset of post.assets) {
        const file = await downloadFile(asset.url, asset.name, asset.type);
        assets.push({
          altText: asset.alt,
          file,
        });
      }
      setAssents(assets);
      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    } catch (e) {
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do certificado. Veja o console para detalhes!"
        );
        console.error(e);
      }
      document.body.style.overflow = "auto";
      router.push("/admin/blog");
    }
  }, [postId, router]);

  useEffect(() => {
    loadDocData();
  }, [loadDocData]);

  return (
    <>
      <div className={styles.hidder} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{postId ? "Editar" : "Adicionar"} Post</title>
          </Head>
          <h1>{postId ? "Editar" : "Adicionar"} Post</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <Input
              label="Nome do Post:"
              placeholder="Digite o Nome do Post"
              required
              state={name}
              setState={setName}
              id="name"
            />
            <TextArea
              label="Descrição:"
              placeholder="Digite uma descrição para o Post:"
              required
              state={description}
              setState={setDescription}
              className={styles.textarea}
              id="description"
            />
            <Input
              label="Data do Post:"
              type="date"
              required
              state={date}
              setState={setDate}
              id="date"
            />
            <ImageInput
              label="Selecione a thumbnail do post"
              required
              setState={setThumbnail}
              state={thumbnail}
            />
            <TextArea
              label="Texto Alternativo da Thumbnail:"
              placeholder="Digite o texto alternativo da thumbnail"
              state={thumbnailAltText}
              setState={setThumbnailAltText}
              className={styles.textarea}
              id="altThumbnail"
              required
            />
            <Textarea
              label="Conteudo: (Markdown)"
              placeholder="Digite o conteudo do post em Markdown"
              required
              className={styles.textAreaContent}
              state={content}
              setState={setContent}
              id="content"
            />
            <AssetsInput setState={setAssents} state={assents} />
            <Button type="submit">Salvar Post</Button>
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
