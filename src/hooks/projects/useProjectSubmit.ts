import { useCallback } from "react";
import { useRouter } from "next/router";
import { addOrUpdateProject } from "@/services/firebase/client/projects";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import {
  processProjectImage,
  validateImage,
} from "@/services/projects/project.service";

export interface FormValues {
  name: string;
  github?: URL;
  youtube?: URL;
  descriptionDesktop: string;
  descriptionMobile: string;
  image: File[];
  keywords: string;
}

export function useProjectSubmit(
  projectId: string | undefined,
  setIsLoading: (loading: boolean) => void
) {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (formData: FormValues) => {
      const {
        name,
        github,
        youtube,
        descriptionDesktop,
        descriptionMobile,
        image,
        keywords,
      } = formData;

      try {
        validateImage(image[0]);
        setIsLoading(true);

        const processedImage = await processProjectImage(image[0]!);

        const responseProjectId = await addOrUpdateProject({
          id: projectId,
          name,
          github: github?.toString() ?? "",
          youtube: youtube?.toString() ?? "",
          descriptionDesktop,
          descriptionMobile,
          image: processedImage.file,
          keywords: keywords.split(",").map((e) => e.trim()),
          imageBlur: processedImage.blur,
        });

        await revalidateNextPages("projects", responseProjectId);

        router.push("/admin/projects");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro desconhecido";
        alert(message);
        setIsLoading(false);
      }
    },
    [projectId, router, setIsLoading]
  );

  return { handleSubmit };
}
