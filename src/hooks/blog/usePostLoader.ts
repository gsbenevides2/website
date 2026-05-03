import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@/utils/toast";
import MyError from "@/utils/MyError";
import { wait } from "@/utils/wait";
import { getPost } from "@/services/firebase/client/posts";
import { downloadFile } from "@/services/blog/file.service";
import { Asset } from "@/services/blog/assets.service";
import { useFormContext } from "@/components/Form";

type UseFormContextReturn = ReturnType<typeof useFormContext>;

export function usePostLoader(
  postId: string | undefined,
  formContext: UseFormContextReturn,
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [previewAssets, setPreviewAssets] = useState<Asset[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPostData = useCallback(async () => {
    if (!postId) {
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    if (hasLoaded) {
      return;
    }

    try {
      const post = await getPost(postId);
      if (!post) throw new MyError("Post não encontrado");

      const thumbnail = await downloadFile(
        post.thumbnail.originalPng,
        "thumbnail.png",
        "image/png",
      );
      const assets: Asset[] = [];
      for (const asset of post.assets) {
        const file = await downloadFile(asset.url, asset.name, asset.type);
        assets.push({
          altText: asset.alt,
          file,
        });
      }
      setPreviewAssets(assets);
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
        toast.error(e.message);
      } else {
        toast.error(
          "Erro ao carregar dados do certificado. Veja o console para detalhes!",
        );
        console.error(e);
      }
      await wait(1000);
      router.push("/admin/blog");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, router, hasLoaded]);

  return {
    isLoading,
    setIsLoading,
    previewAssets,
    setPreviewAssets,
    loadPostData,
  };
}
