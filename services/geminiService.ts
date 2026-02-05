
import { GoogleGenAI } from "@google/genai";

export const pilatesAI = {
  generateRoutine: async (goal: string, level: string) => {
    try {
      // Instanciação dentro do método para garantir que process.env.API_KEY esteja disponível
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Você é um instrutor master de Pilates. Crie uma rotina de treinamento personalizada para um aluno com o objetivo: ${goal}. Nível de experiência: ${level}. Retorne em formato Markdown estruturado com: Nome do Exercício, Repetições/Tempo, Foco Muscular e Dica de Respiração.`,
      });
      return response.text;
    } catch (error) {
      console.error("Erro ao gerar rotina via Gemini:", error);
      return "Desculpe, o instrutor virtual está em intervalo. Tente novamente em alguns segundos.";
    }
  }
};
