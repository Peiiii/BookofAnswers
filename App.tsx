
import React, { useState, useCallback } from 'react';
import { AppState, AnswerData, TemplateId } from './types';
import { generateAnswer } from './services/geminiService';
import AnswerCard from './components/AnswerCard';
import Drawer from './components/Drawer';

const RECOMMENDATIONS = [
  { label: '今日运势', query: '我今天的整体运势如何？给出一些生活的指引。' },
  { label: '职业迷茫', query: '面对职业发展的十字路口，我该坚持现状还是寻找突破？' },
  { label: '内在宁静', query: '最近思绪纷乱，请给我一些关于如何保持内心平静的智慧。' },
];

const App: React.FC = () => {
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

  const handleReset = () => {
    setState(AppState.HOME);
    setQuestion('');
    setAnswer(null);
  };

  return (
    <div className="h-screen bg-[#f3f5f8] font-sans text-gray-900 selection:bg-[#8cc63f]/20 overflow-hidden flex flex-col">
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 left-6 z-30 p-3 bg-white rounded-full shadow-md border border-gray-100 active:scale-95"
      >
        <div className="w-4 h-4 flex flex-col justify-between items-start">
          <span className="w-full h-[2px] bg-gray-400"></span>
          <span className="w-3/4 h-[2px] bg-gray-400"></span>
          <span className="w-full h-[2px] bg-gray-400"></span>
        </div>
      </button>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeTemplate={activeTemplate} 
        onSelect={setActiveTemplate}
      />

      {state === AppState.HOME && (
        <div className="max-w-md mx-auto h-full flex flex-col items-center pt-20 px-6 pb-10 overflow-y-auto w-full">
          <div className="group relative mb-8 shrink-0">
             <div className="w-16 h-16 border-[3px] border-[#8cc63f] flex flex-col items-center justify-center text-[9px] text-[#8cc63f] font-black tracking-tighter">
                <div>ONE</div>
                <div>CUP</div>
             </div>
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#f68b1f] rounded-full"></div>
          </div>
          
          <div className="text-center mb-10 shrink-0">
            <h1 className="text-2xl font-black text-gray-800 font-serif-sc">答案之书</h1>
            <p className="text-gray-400 text-[8px] mt-1 font-black tracking-[0.3em] uppercase opacity-60">The Book of Answers</p>
          </div>
          
          <div className="w-full space-y-8 flex-grow">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在心中冥想你的问题..."
                className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 h-40 focus:border-[#8cc63f]/30 outline-none transition-all resize-none shadow-sm placeholder:text-gray-300 text-sm leading-relaxed"
              />
              <button
                onClick={() => handleAsk()}
                disabled={!question.trim()}
                className="absolute bottom-4 right-4 w-12 h-12 bg-[#8cc63f] text-white rounded-xl shadow-lg flex items-center justify-center active:scale-90 disabled:opacity-30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 px-1">
                <span className="text-[9px] text-gray-300 font-black tracking-widest uppercase">启发灵感</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {RECOMMENDATIONS.map((rec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(rec.query)}
                    className="bg-white/70 active:bg-white border border-gray-50 py-4 px-5 rounded-xl text-[12px] text-gray-600 font-semibold transition-all text-left flex items-center justify-between"
                  >
                    <span>{rec.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#8cc63f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-auto pt-8 text-[8px] text-gray-300 tracking-[0.3em] font-black uppercase flex flex-col items-center shrink-0">
            <div className="w-6 h-[1px] bg-gray-200 mb-3"></div>
            ONE CUP WISDOM
          </footer>
        </div>
      )}

      {state === AppState.LOADING && (
        <div className="h-full flex flex-col items-center justify-center px-10 space-y-8">
          <div className="relative">
             <div className="w-20 h-20 border-[2px] border-[#8cc63f]/10 rounded-full"></div>
             <div className="absolute inset-0 w-20 h-20 border-[3px] border-[#8cc63f] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-gray-800 font-black text-xl font-serif-sc">正在解析心流...</h3>
            <p className="text-gray-400 text-[8px] tracking-[0.3em] uppercase mt-1 opacity-50">Resonating...</p>
          </div>
        </div>
      )}

      {state === AppState.RESULT && answer && (
        <AnswerCard data={answer} onReset={handleReset} templateId={activeTemplate} />
      )}
    </div>
  );
};

export default App;
