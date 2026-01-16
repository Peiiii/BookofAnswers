
import React, { useState, useCallback } from 'react';
import { AppState, AnswerData } from './types';
import { generateAnswer } from './services/geminiService';
import AnswerCard from './components/AnswerCard';

const RECOMMENDATIONS = [
  { label: '今日运势', query: '我今天的整体运势如何？给出一些生活的指引。' },
  { label: '职业选择', query: '关于职业发展的困惑，我该坚持现状还是寻找突破？' },
  { label: '情感解忧', query: '在感情关系中感到迷茫，请给我一些关于亲密关系的智慧。' },
  { label: '财富观', query: '如何建立正确的金钱观和财富心态？' },
  { label: '心态调节', query: '最近压力很大，请给我一些安抚心灵的建议。' },
  { label: '人际交往', query: '在社交中总是感到疲惫，我该如何处理人际关系？' },
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AnswerData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleReset = () => {
    setState(AppState.HOME);
    setQuestion('');
    setAnswer(null);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      {state === AppState.HOME && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center pt-20 px-6 pb-12">
          {/* Logo Section */}
          <div className="w-16 h-16 mb-8 border-[3px] border-[#8cc63f] flex flex-col items-center justify-center text-[10px] text-[#8cc63f] font-black tracking-tighter">
            <div>ONE</div>
            <div>CUP</div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-1">答案之书</h1>
          <p className="text-gray-400 text-[10px] mb-10 font-medium tracking-[0.2em] uppercase">The Book of Answers</p>
          
          {/* Input Section */}
          <div className="w-full space-y-6">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在心中冥想你的问题，或直接输入..."
                className="w-full bg-white border border-gray-100 rounded-3xl p-6 h-40 focus:ring-4 focus:ring-[#8cc63f]/10 focus:border-[#8cc63f]/30 outline-none transition-all resize-none shadow-sm placeholder:text-gray-300 text-sm leading-relaxed"
              />
              <button
                onClick={() => handleAsk()}
                disabled={!question.trim()}
                className="absolute bottom-4 right-4 p-3 bg-[#8cc63f] text-white rounded-2xl shadow-lg shadow-[#8cc63f]/20 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 px-1">
                <div className="h-[1px] flex-1 bg-gray-200"></div>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">寻找灵感</span>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {RECOMMENDATIONS.map((rec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(rec.query)}
                    className="bg-white/60 hover:bg-white hover:shadow-md border border-gray-100 py-3 px-4 rounded-2xl text-[11px] text-gray-600 font-medium transition-all text-left flex items-center justify-between group"
                  >
                    <span>{rec.label}</span>
                    <span className="text-[#8cc63f] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            </div>
            
            {error && <p className="text-red-500 text-center text-xs mt-2 animate-bounce">{error}</p>}
          </div>

          <footer className="mt-auto pt-10 text-[9px] text-gray-300 tracking-widest font-medium uppercase">
            Guided by Inner Wisdom
          </footer>
        </div>
      )}

      {state === AppState.LOADING && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-6 space-y-8">
          <div className="relative">
             {/* Dynamic loading effect matching the brand green */}
             <div className="w-20 h-20 border-[6px] border-[#8cc63f]/10 rounded-full"></div>
             <div className="absolute inset-0 w-20 h-20 border-[6px] border-[#8cc63f] rounded-full border-t-transparent animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#f68b1f] rounded-full animate-ping"></div>
             </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-800 font-bold text-lg tracking-tight">正在翻阅答案...</p>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-bold">Resonating with Cosmic Flow</p>
          </div>
        </div>
      )}

      {state === AppState.RESULT && answer && (
        <AnswerCard data={answer} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
