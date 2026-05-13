import { useState, useCallback } from "react";
import { toast } from "@/utils/toast";
import { retriveIdToken } from "@/services/firebase/client/auth";
import { useFormContext } from "@/components/Form";

type UseFormContextReturn = ReturnType<typeof useFormContext>;

interface FetchAIKeywordsParams {
  title: string;
  description: string;
  content: string;
}

async function fetchAIKeywords({
  title,
  description,
  content,
}: FetchAIKeywordsParams) {
  const idToken = await retriveIdToken();

  const response = await fetch("/api/ai/blog-keywords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
      title,
      description,
      content,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao gerar keywords");
  }

  return await response.json();
}

export function useAIKeywords(formContext: UseFormContextReturn) {
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);

  const handleGenerate = useCallback(async () => {
    const title = formContext.getValue("name") as string;
    const description = formContext.getValue("description") as string;
    const content = formContext.getValue("content") as string;

    // Validation
    if (!title || title.trim().length === 0) {
      toast.warning(
        "Por favor, preencha o título do post antes de gerar keywords",
      );
      return;
    }

    if (!description || description.trim().length === 0) {
      toast.warning(
        "Por favor, preencha a descrição do post antes de gerar keywords",
      );
      return;
    }

    if (!content || content.trim().length === 0) {
      toast.warning(
        "Por favor, preencha o conteúdo do post antes de gerar keywords",
      );
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const data = await fetchAIKeywords({ title, description, content });
      setGeneratedKeywords(data.keywords);
      toast.success(`${data.keywords.length} keywords geradas com sucesso!`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Erro ao gerar keywords:", err);
    } finally {
      setIsGenerating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyKeywords = useCallback(() => {
    if (generatedKeywords.length === 0) {
      toast.warning("Nenhuma keyword para aplicar");
      return;
    }

    const keywordsString = generatedKeywords.join(", ");
    formContext.changeInputValue("keywords", keywordsString);
    setShowModal(false);
    setGeneratedKeywords([]);
    toast.success("Keywords aplicadas ao formulário!");
  }, [generatedKeywords, formContext]);

  const removeKeyword = useCallback((index: number) => {
    setGeneratedKeywords((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addKeyword = useCallback(
    (keyword: string) => {
      const trimmed = keyword.trim().toLowerCase();
      if (trimmed.length === 0) return;

      if (generatedKeywords.includes(trimmed)) {
        toast.warning("Esta keyword já existe na lista");
        return;
      }

      setGeneratedKeywords((prev) => [...prev, trimmed]);
    },
    [generatedKeywords],
  );

  const openModal = useCallback(() => {
    setShowModal(true);
    setError(null);
    setGeneratedKeywords([]);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setError(null);
    setGeneratedKeywords([]);
  }, []);

  return {
    showModal,
    isGenerating,
    error,
    generatedKeywords,
    handleGenerate,
    applyKeywords,
    removeKeyword,
    addKeyword,
    openModal,
    closeModal,
  };
}
