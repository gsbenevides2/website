import { useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "@/utils/toast";
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
  keywords: string;
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
        keywords,
        name,
      } = formData;

      try {
        validateThumbnail(thumbnail[0]);
        await validateThumbnailFormat(thumbnail[0]!);

        const generatedThumbnails = await generateBlogThumbnails(thumbnail[0]!);
        const generatedAssets = await generateAssets(assets);

        // Parse keywords from comma-separated string to array
        const keywordsArray = keywords
          .split(",")
          .map((k) => k.trim().toLowerCase())
          .filter((k) => k.length > 0);

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
          keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
        });

        router.push("/admin/blog");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro desconhecido";
        toast.error(message);
        setIsLoading(false);
      }
    },
    [postId, router, setIsLoading],
  );

  return { handleSubmit };
}
