import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

import {
  GoogleGenAI,
  Modality,
} from "@google/genai";

interface BlogThumbnailRequestBody {
  idToken: string;
  prompt: string;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const systemInstruction = `
Você é um designer especialista em thumbnails para blogs e conteúdos de tecnologia focados em desenvolvedores (front-end, performance web, e-commerce e arquitetura).

Seu objetivo é criar thumbnails com alto CTR, que despertem curiosidade e comuniquem valor técnico rapidamente.

🎯 Público-alvo:
Desenvolvedores (junior a pleno), interessados em performance, Next.js, arquitetura, APIs, testes e boas práticas.

🎨 Direção visual:

Estilo moderno, tech e levemente “dark mode”
Fundo escuro (#171717 ou similar)
Cores de destaque: verde neon, azul elétrico, roxo
Alto contraste e legibilidade
Visual inspirado em dashboards, código e interfaces

🔤 Tipografia:

Texto curto e impactante (máx. 35 palavras)
Uso de números, termos técnicos ou gatilhos de curiosidade
Ex: “ISG vs SSR”, “Cache que salva”, “Erro crítico”, “+300% perf”

🧠 Estratégia de atenção:

Criar curiosidade ou tensão (ex: erro, comparação, melhoria extrema)
Usar contraste visual (antes/depois, lento/rápido, certo/errado)
Foco em um único conceito forte

🧩 Elementos visuais:

Código (React, Next.js, API, JSON)
Gráficos de performance
Ícones de server, cloud, banco de dados
Prints estilizados de UI

❌ Evitar:

Muito texto
Elementos genéricos sem contexto técnico
Visual poluído

Seu retorno deve ser somente a imagem em 3:2 e o texto para deficientes visuais e mais nada!
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { idToken, prompt } =
      req.body as BlogThumbnailRequestBody;

    // Method validation
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Auth validation
    if (!idToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isAdmin = await validateAdminUser(idToken);
    if (!isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Input validation
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (prompt.length > 2000) {
      return res
        .status(400)
        .json({ error: "Prompt must be less than 2000 characters" });
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Step 1: Generate image using Gemini
    console.log("Generating image with Gemini...");

    const imageResult = await genAI.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        systemInstruction,
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        imageConfig: {
          aspectRatio: "3:2",
        },
      },
    });

    const generatedImageBaseDataData = imageResult.candidates
      ?.at(0)
      ?.content?.parts?.find((part) => part.inlineData?.data)?.inlineData?.data;

      const mimeTypeFromResponse = imageResult.candidates
      ?.at(0)
      ?.content?.parts?.find((part) => part.inlineData?.mimeType)?.inlineData
      ?.mimeType;
    

    const alt = imageResult.text ?? "Blog thumbnail image";

    if (!generatedImageBaseDataData || !mimeTypeFromResponse) {
      console.error(
        "No image in Gemini response:",
        JSON.stringify(imageResult, null, 2),
      );
      return res.status(500).json({ error: "Failed to generate image" });
    }

    const finalBase = `data:${mimeTypeFromResponse};base64,${generatedImageBaseDataData}`;

    console.log("Blog thumbnail generated successfully");
    return res.status(200).json({
      imageBase64: finalBase,
      mimeType: mimeTypeFromResponse,
      alt,
    });
  } catch (error: any) {
    console.error("Error in /api/ai/blog-thumbnail:", error);

    // Handle rate limiting
    if (
      error.message?.includes("quota") ||
      error.message?.includes("rate limit")
    ) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded, try again later" });
    }

    // Handle model availability
    if (
      error.message?.includes("not found") ||
      error.message?.includes("not available")
    ) {
      return res
        .status(500)
        .json({ error: "Image generation not available with this model" });
    }

    // Handle API key errors
    if (error.message?.includes("API key")) {
      return res.status(500).json({ error: "Invalid API key" });
    }

    // Handle sharp/image processing errors
    if (
      error.message?.includes("Input buffer") ||
      error.message?.includes("sharp")
    ) {
      return res.status(500).json({ error: "Failed to process image" });
    }

    return res.status(500).json({ error: "Failed to generate blog thumbnail" });
  }
}
