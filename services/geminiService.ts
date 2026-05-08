
import { GoogleGenAI, Type } from "@google/genai";
import { ScriptParams, ScriptResult } from "../types";

export const generateScript = async (params: ScriptParams): Promise<ScriptResult> => {
 const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});
  
  const prompt = `
    Você é um estrategista sênior de conteúdo audiovisual para YouTube.
    Gere um roteiro completo baseado nos seguintes parâmetros:
    - Modo: ${params.mode}
    - Tema: ${params.theme}
    - Público: ${params.audience}
    - Objetivo: ${params.objective}
    - Plataforma: ${params.platform}
    - Duração: ${params.duration}
    - Profundidade: ${params.depth}
    - Estilo: ${params.style}
    - Tom: ${params.tone}
    - Emoção Dominante: ${params.emotion}
    - Nível de Autoridade: ${params.authority}
    - Tipo de CTA: ${params.cta}
    - Apresentação: ${params.presentation}
    - Potencial Viral Elevado: ${params.isViralPotential ? 'Sim (otimização agressiva)' : 'Não (foco educacional)'}
    ${params.mode === 'Roteiro Manual' ? `- Roteiro Base para Melhorar: ${params.baseScript}` : ''}

    REGRAS ADICIONAIS:
    - Se Plataforma = Shorts: Hook imediato, ritmo acelerado, frases curtas, loop infinito sugerido.
    - Se Viral Potential = Sim: Hook provocativo, Título magnético, Thumbnail emocional.
  `;

  const response = await ai.models.generateContent({
   model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          promise: { type: Type.STRING },
          structure: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                label: { type: Type.STRING },
                content: { type: Type.STRING }
              },
              required: ["time", "label", "content"]
            }
          },
          microHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
          bRollSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          avatarInstructions: {
            type: Type.OBJECT,
            properties: {
              intonation: { type: Type.STRING },
              pauses: { type: Type.STRING },
              bodyLanguage: { type: Type.STRING },
              expressions: { type: Type.STRING }
            }
          },
          optimizedTitle: { type: Type.STRING },
          optimizedDescription: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          thumbnailConcept: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              expression: { type: Type.STRING },
              element: { type: Type.STRING },
              color: { type: Type.STRING }
            }
          },
          fullScriptContent: { type: Type.STRING }
        },
        required: ["hook", "promise", "structure", "microHooks", "bRollSuggestions", "optimizedTitle", "optimizedDescription", "tags", "thumbnailConcept", "fullScriptContent"]
      }
    }
  });

  return JSON.parse(response.text);
};
