import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please configure it in the Secrets panel.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || "You are a professional career coach at CareerHub. Help users with job search, resume building, interview prep, and career guidance."
    }
  });

  return response.text;
};

export const createAIChat = (systemInstruction?: string) => {
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: systemInstruction || "You are a professional career coach at CareerHub. Help users with job search, resume building, interview prep, and career guidance."
    }
  });
};
