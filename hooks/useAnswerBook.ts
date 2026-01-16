
import { useState, useCallback } from 'react';
import { AppState, AnswerData, TemplateId } from '../types';
import { generateAnswer } from '../services/geminiService';

export const useAnswerBook = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AnswerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('one-cup');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAsk = useCallback(async (customQuery?: string) => {
    const finalQuery = customQuery || question;
    if (!finalQuery.trim()) return;
    
    setState(AppState.LOADING);
    setError(null);
    
    try {
      const result = await generateAnswer(finalQuery);
      setAnswer(result);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError('智慧之门暂时关闭，请稍后再试。');
      setState(AppState.HOME);
    }
  }, [question]);

  const handleReset = useCallback(() => {
    setState(AppState.HOME);
    setQuestion(question); // 保留问题，方便修改
    setAnswer(null);
  }, [question]);

  const clearQuestion = useCallback(() => {
    setQuestion('');
  }, []);

  return {
    state,
    question,
    setQuestion,
    answer,
    error,
    activeTemplate,
    setActiveTemplate,
    isDrawerOpen,
    setIsDrawerOpen,
    handleAsk,
    handleReset,
    clearQuestion
  };
};
