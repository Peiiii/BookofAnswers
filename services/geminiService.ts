
import { GoogleGenAI, Type } from "@google/genai";
import { AnswerData } from "../types";

export interface Recommendation {
  label: string;
  query: string;
}

const MODEL_NAME = 'gemini-3-flash-preview';

export const generateAnswer = async (question: string): Promise<AnswerData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `你是一位冷静、理性的生活导师。用户提问：“${question}”。
    请基于心理学和现实逻辑，提供一份“一格 (One Cup)”风格的实用指南。

    要求：
    1. 拒绝玄学：不要提命运、星辰或虚无，要提方法论、心态建设和具体行动。
    2. title: 4-6字建议，如“建立边界”、“先易后难”、“控制损耗”。
    3. subtitle: 建议的英文，全大写。
    4. category: 现实维度（职场、金钱、社交、健康）。
    5. subheading: 问题的理性本质拆解。
    6. tableHeaderA: '感性直觉' (Emotion)。
    7. tableHeaderB: '理性对策' (Logic)。
    8. comparison: 4组维度的对比。维度要具体（如：沟通方式、资源分配、情绪处理）。
    9. conclusion: 一句扎实、有力量的生活金句。`,
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

export const generateRecommendations = async (): Promise<Recommendation[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `请批量生成3个普通人日常生活中最常遇到的、具体的烦恼或选择题。
    
    选题范围：工作汇报压力、拒绝同事、存不下钱、熬夜难以改变、感情中的小摩擦。
    
    格式：
    - label: 4字标签（如：拒绝技巧、金钱管理、作息调整）。
    - query: 一个具体的场景化提问（如：面对总是推卸责任的同事，我该如何体面地拒绝额外工作？）。
    
    注意：语境要真实，不要玄乎，一次性返回3条数据。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            query: { type: Type.STRING }
          },
          required: ["label", "query"]
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};
