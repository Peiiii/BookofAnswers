
import { GoogleGenAI, Type } from "@google/genai";
import { AnswerData } from "../types";

export const generateAnswer = async (question: string): Promise<AnswerData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `你现在是《答案之书》的智慧内核。用户正在寻求关于“${question}”的指引。
    请生成一个符合“一格 (One Cup)”设计风格的、充满哲思、极简且平衡的回复。
    
    输出要求：
    1. title: 一个有力、简洁的4-6字中文词组，作为核心建议（如：顺其自然、破茧成蝶、持盈履满）。
    2. subtitle: 标题的诗意英文翻译，全大写。
    3. category: 建议所属的生命维度（如：自我成长、时空秩序、情感共振）。
    4. subheading: 核心对比的导言（如：关于“进”与“退”的艺术）。
    5. subheadingEn: 导言的英文翻译。
    6. tableHeaderA: '知者' (The Wise)。
    7. tableHeaderB: '行者' (The Doer)。
    8. comparison: 4组维度对比。维度应该是抽象的（如：节奏、心态、目光），对比项应该是富有智慧的短句。
    9. conclusion: 一句充满力量的“金句”总结（15-25字），能够引发深思。
    10. conclusionEn: 金句的英文诗意翻译。`,
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
