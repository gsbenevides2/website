import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

interface BlogKeywordsRequestBody {
  idToken: string;
  title: string;
  description: string;
  content: string;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

const systemInstruction = `
Você é um especialista em SEO e otimização de conteúdo para blogs de tecnologia.

Sua tarefa é analisar um post de blog (título, descrição e conteúdo) e gerar keywords (palavras-chave) relevantes para SEO.

🎯 Objetivo:
Gerar 5-10 keywords que melhor representem o conteúdo do post e ajudem no ranqueamento em buscadores.

📋 Diretrizes:

1. **Relevância**: As keywords devem ser diretamente relacionadas ao conteúdo do post
2. **Especificidade**: Prefira termos específicos a genéricos (ex: "next.js ssr" ao invés de só "next.js")
3. **Variação**: Inclua tanto termos técnicos quanto variações mais acessíveis
4. **Comprimento**: Palavras-chave podem ter 1-3 palavras
5. **Lowercase**: Sempre em minúsculas
6. **Sem duplicatas**: Não repetir keywords
7. **Contexto BR**: Considere termos em português brasileiro quando relevante
8. **Tecnologias**: Inclua nomes de tecnologias, frameworks e conceitos mencionados

✅ Boas keywords:
- "react hooks"
- "performance web"
- "next.js"
- "typescript"
- "seo"
- "cache http"

❌ Evitar:
- Keywords muito genéricas ("programação", "web")
- Keywords não relacionadas ao conteúdo
- Repetições ou sinônimos muito próximos
- Mais de 10 keywords (poluição)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { idToken, title, description, content } =
      req.body as BlogKeywordsRequestBody;

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
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Check API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY not configured");
      return res
        .status(500)
        .json({ error: "Google Generative AI API key not configured" });
    }

    // Generate keywords using Gemini
    console.log("Generating keywords with Gemini...");

    const prompt = `
Analise o seguinte post de blog e gere keywords relevantes para SEO:

**Título:** ${title}

**Descrição:** ${description}

**Conteúdo (primeiros 3000 caracteres):**
${content.substring(0, 3000)}

Gere de 5 a 10 keywords relevantes para este post.
`;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
      system: systemInstruction,
      output: Output.array({
        name: "keywords",
        description: "Array of SEO keywords for the blog post",
        element: z
          .string()
          .describe("A relevant keyword (1-3 words, lowercase)"),
      }),
    });

    // Get the structured output
    let keywords = result.output;

    // Validate and clean keywords
    if (!Array.isArray(keywords) || keywords.length === 0) {
      console.error("No keywords generated");
      return res.status(500).json({
        error: "No keywords generated",
      });
    }

    // Normalize: lowercase, trim, remove duplicates, limit to 10
    keywords = Array.from(
      new Set(
        keywords
          .map((k) => k.toLowerCase().trim())
          .filter((k) => k.length > 0 && k.length <= 50),
      ),
    ).slice(0, 10);

    if (keywords.length === 0) {
      console.error("No valid keywords after normalization");
      return res.status(500).json({
        error: "No valid keywords generated",
      });
    }

    console.log(`Keywords generated successfully: ${keywords.length} keywords`);
    return res.status(200).json({ keywords });
  } catch (error: any) {
    console.error("Error in /api/ai/blog-keywords:", error);

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
        .json({ error: "Keyword generation not available with this model" });
    }

    // Handle API key errors
    if (error.message?.includes("API key")) {
      return res.status(500).json({ error: "Invalid API key" });
    }

    return res.status(500).json({ error: "Failed to generate blog keywords" });
  }
}
