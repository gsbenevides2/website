import InputCustom from "@/components/Input";
import TextareaCustom from "@/components/TextArea";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import MyError from "@/utils/MyError";
import { ImageInput } from "@/components/ImageInput";
import AssetsInput from "@/components/AssetsInput";
import Loader from "@/components/Loader";
import {
  Form,
  Input,
  StatelessInput,
  Textarea,
  useFormContext,
} from "@/components/Form";
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
import { FormSubmitEvent } from "@/components/Form/types";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import { wait } from "@/utils/wait";
import classNames from "classnames";

interface Asset {
  altText: string;
  file: File;
}

async function verifyThumbnails(original: File): Promise<boolean> {
  const base64 = await fileToBase64(original);
  const fileType = getMimeType(base64);
  if (fileType !== "image/png") return false;
  const sizes = await getSizeOfImage(base64);
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

interface FormValues {
  altThumbnail: string;
  assets: Asset[];
  content: string;
  date: Date;
  description: string;
  image: File[];
  name: string;
}

export default function Page() {
  const router = useRouter();
  const postId =
    router.query.id === "new" ? undefined : (router.query.id as string);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const { state: authState } = useAdminAuthentication();
  const formContext = useFormContext();
  const formSubmit: FormSubmitEvent<FormValues> = useCallback(
    async (e) => {
      setIsLoading(true);
      const {
        altThumbnail,
        assets,
        content,
        date,
        description,
        image: thumbnail,
        name,
      } = e;
      if (!thumbnail[0]) {
        alert("Selecione uma imagem para thumbnail");
        return;
      }
      if (!(await verifyThumbnails(thumbnail[0]))) {
        alert("A imagem da thumbnail deve ser PNG e ter 1000x667");
        return;
      }

      const generatedThumbnails = await generateBlogThumbnails(thumbnail[0]);

      const generatedAssets = await generateAssets(assets);

      await createOrUpdatePost({
        id: postId,
        name,
        description,
        date,
        content,
        thumbnail: {
          ...generatedThumbnails,
          alt: altThumbnail,
        },
        assets: generatedAssets,
      });
      setIsLoading(false);

      router.push("/admin/blog");
    },
    [postId, router]
  );

  const loadDocData = useCallback(async () => {
    if (!postId) return setIsLoading(false);

    try {
      const post = await getPost(postId);
      if (!post) throw new MyError("Post não encontrado");

      const thumbnail = await downloadFile(
        post.thumbnail.originalPng,
        "thumbnail.png",
        "image/png"
      );
      const assets: Asset[] = [];
      for (const asset of post.assets) {
        const file = await downloadFile(asset.url, asset.name, asset.type);
        assets.push({
          altText: asset.alt,
          file,
        });
      }
      console.log(post);
      formContext.changeMultipleInputValues({
        name: post.name,
        description: post.description,
        date: post.date,
        content: post.content,
        altThumbnail: post.thumbnail.alt,
        assets: assets,
        image: [thumbnail],
      });
    } catch (e) {
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do certificado. Veja o console para detalhes!"
        );
        console.error(e);
      }
      await wait(1000);
      router.push("/admin/blog");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, router]);

  useEffect(() => {
    function showLoading() {
      if (!loader.current || !hidder.current) return;
      hidder.current.classList.add(styles.hide);
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
    }
    function hideLoading() {
      if (!loader.current || !hidder.current) return;
      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    }
    if (isLoading) showLoading();
    else hideLoading();
  }, [loader, hidder, isLoading]);

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      loadDocData();
    } else if (authState === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [authState, loadDocData, router]);

  return (
    <>
      <div className={classNames(styles.hidder, styles.hide)} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>{postId ? "Editar" : "Adicionar"} Post</title>
          </Head>
          <h1>{postId ? "Editar" : "Adicionar"} Post</h1>
          <Form
            className={styles.form}
            submit={formSubmit}
            contextLoader={formContext.contextLoader}
          >
            <Input
              placeholder="Digite o Nome do Post"
              required
              id="name"
              name="name"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Nome do Post:" />
              )}
            />
            <Textarea
              placeholder="Digite uma descrição para o Post:"
              required
              id="description"
              name="description"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom {...props} label="Descrição:" />
              )}
            />
            <Input
              type="date"
              required
              name="date"
              id="date"
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Data do Post:" />
              )}
            />
            <StatelessInput
              name="image"
              customComponent={(props) => (
                <ImageInput
                  {...props}
                  label="Selecione a thumbnail do post"
                  required
                  allowDownload
                />
              )}
            />

            <Textarea
              placeholder="Digite o texto alternativo da thumbnail"
              className={styles.textarea}
              id="altThumbnail"
              name="altThumbnail"
              required
              customComponent={({ ref, ...props }) => (
                <TextareaCustom
                  {...props}
                  label="Texto Alternativo da Thumbnail:"
                />
              )}
            />
            <Textarea
              placeholder="Digite o conteudo do post em Markdown"
              required
              className={styles.textAreaContent}
              id="content"
              name="content"
              customComponent={({ ref, ...props }) => (
                <TextareaCustom {...props} label="Conteudo: (Markdown)" />
              )}
            />
            <StatelessInput
              name="assets"
              initialState={[]}
              customComponent={(props) => (
                <AssetsInput {...props} allowDownload />
              )}
            />
            <Button type="submit">Salvar Post</Button>
          </Form>
        </div>
      </div>
      <div
        className={classNames(styles.loader, styles.update, styles.show)}
        ref={loader}
      >
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
