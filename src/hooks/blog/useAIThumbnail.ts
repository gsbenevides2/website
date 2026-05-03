import { useState, useCallback } from "react";
import { toast } from "@/utils/toast";
import { retriveIdToken } from "@/services/firebase/client/auth";
import { base64ToFile } from "@/utils/imageManager";
import { useFormContext } from "@/components/Form";

type UseFormContextReturn = ReturnType<typeof useFormContext>;

async function fetchAIThumbnail(prompt: string) {
  const idToken = await retriveIdToken();

  const response = await fetch("/api/ai/blog-thumbnail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      prompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao gerar thumbnail");
  }

  return await response.json();
}

export function useAIThumbnail(formContext: UseFormContextReturn) {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      toast.warning("Por favor, forneça uma descrição para a imagem");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const data = await fetchAIThumbnail(description);

      const file = base64ToFile(data.imageBase64, "thumbnail-ai.png");

      formContext.changeInputValue("image", [file]);
      formContext.changeInputValue("altThumbnail", data.alt);

      setShowModal(false);
      setDescription("");
      toast.success("Thumbnail gerada com sucesso!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao gerar thumbnail:", err);
    } finally {
      setIsGenerating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  const openModal = useCallback(() => {
    setShowModal(true);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setError(null);
  }, []);

  return {
    showModal,
    description,
    setDescription,
    isGenerating,
    error,
    handleGenerate,
    openModal,
    closeModal,
  };
}
