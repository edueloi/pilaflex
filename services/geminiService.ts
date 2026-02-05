
import { GoogleGenAI } from "@google/genai";

export class PilatesAIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateRoutine(goal: string, level: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma rotina de pilates para um aluno com o objetivo: ${goal}. Nível: ${level}. Retorne em formato Markdown estruturado com exercícios, repetições e dicas de respiração.`,
      });
      return response.text;
    } catch (error) {
      console.error("Erro ao gerar rotina:", error);
      return "Desculpe, não consegui gerar a rotina no momento.";
    }
  }
}

export const pilatesAI = new PilatesAIService();
