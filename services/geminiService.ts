
import { GoogleGenAI, Type } from "@google/genai";
import { AnswerData } from "../types";

export const generateAnswer = async (question: string): Promise<AnswerData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are the 'Book of Answers'. A user is seeking wisdom regarding: "${question}". 
    Generate a philosophical, minimalist, and aesthetically balanced response in the 'One Cup' design style.
    
    Requirements:
    1. title: A concise, impactful 4-6 character Chinese phrase that acts as the core advice (e.g., 顺其自然, 勇往直前, 暂缓脚步).
    2. subtitle: A poetic English translation of the title.
    3. category: The life domain this advice belongs to (e.g., 心灵成长, 职场智慧, 情感寄托).
    4. subheading: A summary of the comparison (e.g., 关于行动的两种姿态).
    5. subheadingEn: English translation of subheading.
    6. tableHeaderA: '智者' (The Wise).
    7. tableHeaderB: '愚者' (The Foolish).
    8. comparison: 4 rows comparing high-level attitudes or behaviors (Dimension, Wise Choice, Foolish Choice). Keep it abstract and philosophical.
    9. conclusion: A final 'golden sentence' in Chinese (around 15-20 characters).
    10. conclusionEn: Poetic English translation of the conclusion.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          category: { type: Type.STRING },
          subheading: { type: Type.STRING },
          subheadingEn: { type: Type.STRING },
          tableHeaderA: { type: Type.STRING },
          tableHeaderB: { type: Type.STRING },
          comparison: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dimension: { type: Type.STRING },
                optionA: { type: Type.STRING },
                optionB: { type: Type.STRING }
              },
              required: ["dimension", "optionA", "optionB"]
            }
          },
          conclusion: { type: Type.STRING },
          conclusionEn: { type: Type.STRING }
        },
        required: ["title", "subtitle", "category", "subheading", "subheadingEn", "tableHeaderA", "tableHeaderB", "comparison", "conclusion", "conclusionEn"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};
