import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Generates visual content using the Gemini Flash Image model (Nano Banana).
 * This replaces the previous Veo video generation.
 */
export const generateVisualContent = async (prompt: string): Promise<string | null> => {
  try {
    // Initialize Client with env key directly (Nano Banana doesn't need window.aistudio selection)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Generate Content using gemini-2.5-flash-image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part && part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${base64ImageBytes}`;
    }

    return null;

  } catch (error) {
    console.error("Error generating visual content:", error);
    throw error;
  }
};