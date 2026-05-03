import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@/utils/toast";
import MyError from "@/utils/MyError";
import { getProject } from "@/services/firebase/client/projects";
import { downloadProjectImageFile } from "@/services/projects/file.service";
import { useFormContext } from "@/components/Form";

type UseFormContextReturn = ReturnType<typeof useFormContext>;

export function useProjectLoader(
  projectId: string | undefined,
  formContext: UseFormContextReturn,
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadProjectData = useCallback(async () => {
    if (!projectId) {
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    if (hasLoaded) {
      return;
    }

    try {
      const project = await getProject(projectId);
      const imageFile = await downloadProjectImageFile(projectId);

      formContext.changeMultipleInputValues({
        name: project.name,
        github: project.github,
        youtube: project.youtube,
        descriptionDesktop: project.descriptionDesktop,
        descriptionMobile: project.descriptionMobile,
        keywords: project.keywords.join(","),
        image: [imageFile],
      });
    } catch (e) {
      if (e instanceof MyError) {
        toast.error(e.message);
      } else {
        toast.error(
          "Erro ao carregar dados do projeto. Veja o console para detalhes!",
        );
        console.error(e);
      }
      router.push("/admin/projects");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, router, hasLoaded]);

  return { isLoading, setIsLoading, loadProjectData };
}
