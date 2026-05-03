import { useCallback } from "react";
import { useRouter } from "next/router";
import { createOrUpdatePost } from "@/services/firebase/client/posts";
import {
  generateBlogThumbnails,
  validateThumbnail,
  validateThumbnailFormat,
} from "@/services/blog/thumbnail.service";
import { Asset, generateAssets } from "@/services/blog/assets.service";

export interface FormValues {
  altThumbnail: string;
  assets: Asset[];
  content: string;
  date: Date;
  description: string;
  image: File[];
  name: string;
}

export function usePostSubmit(
  postId: string | undefined,
  setIsLoading: (loading: boolean) => void,
) {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (formData: FormValues) => {
      setIsLoading(true);
      const {
        altThumbnail,
        assets,
        content,
        date,
        description,
        image: thumbnail,
        name,
      } = formData;

      try {
        validateThumbnail(thumbnail[0]);
        await validateThumbnailFormat(thumbnail[0]!);

        const generatedThumbnails = await generateBlogThumbnails(thumbnail[0]!);
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

        router.push("/admin/blog");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro desconhecido";
        alert(message);
        setIsLoading(false);
      }
    },
    [postId, router, setIsLoading],
  );

  return { handleSubmit };
}
