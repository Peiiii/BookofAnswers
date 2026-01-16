
import { useState, useCallback, useEffect } from 'react';
import { AppState, AnswerData, TemplateId } from '../types';
import { generateAnswer, generateRecommendations, Recommendation } from '../services/geminiService';

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  { label: '职场拒绝', query: '面对同事推来的不属于我的工作，我该如何体面地拒绝？' },
  { label: '财务规划', query: '虽然收入尚可但总是存不下钱，我该如何建立正确的金钱观？' },
  { label: '精力管理', query: '每天下班后都想报复性熬夜，我该如何打破这个死循环？' },
];

export const useAnswerBook = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AnswerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('one-cup');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMENDATIONS);
  const [isRefreshingRecs, setIsRefreshingRecs] = useState(false);

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
      setError('系统正忙，请稍后再试。');
      setState(AppState.HOME);
    }
  }, [question]);

  const refreshRecommendations = useCallback(async () => {
    setIsRefreshingRecs(true);
    try {
      // 优化：一次性获取3条
      const newRecs = await generateRecommendations();
      setRecommendations(newRecs);
    } catch (err) {
      console.error('Failed to refresh recommendations', err);
    } finally {
      setIsRefreshingRecs(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setState(AppState.HOME);
    setQuestion('');
    setAnswer(null);
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
    recommendations,
    isRefreshingRecs,
    refreshRecommendations,
    handleAsk,
    handleReset
  };
};
