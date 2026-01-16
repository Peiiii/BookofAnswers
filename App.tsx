
import React, { useState, useCallback } from 'react';
import { AppState, AnswerData, TemplateId } from './types';
import { generateAnswer } from './services/geminiService';
import AnswerCard from './components/AnswerCard';
import Drawer from './components/Drawer';

const RECOMMENDATIONS = [
  { label: '今日运势', query: '我今天的整体运势如何？给出一些生活的指引。' },
  { label: '职业迷茫', query: '面对职业发展的十字路口，我该坚持现状还是寻找突破？' },
  { label: '内在宁静', query: '最近思绪纷乱，请给我一些关于如何保持内心平静的智慧。' },
  { label: '人际秩序', query: '如何处理社交中的倦怠感，建立良性的人际边界？' },
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
      setError('智慧之门暂时关闭，请重整心绪后尝试。');
      setState(AppState.HOME);
    }
  }, [question]);

  const handleReset = () => {
    setState(AppState.HOME);
    setQuestion('');
    setAnswer(null);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] font-sans text-gray-900 selection:bg-[#8cc63f]/20 selection:text-[#8cc63f] overflow-x-hidden">
      {/* Dynamic Menu Button */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-8 left-8 z-30 p-4 bg-white rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-all active:scale-95 group"
      >
        <div className="w-5 h-5 flex flex-col justify-between items-start">
          <span className="w-full h-[2px] bg-gray-400 group-hover:bg-[#8cc63f] transition-colors"></span>
          <span className="w-3/4 h-[2px] bg-gray-400 group-hover:bg-[#8cc63f] transition-colors"></span>
          <span className="w-full h-[2px] bg-gray-400 group-hover:bg-[#8cc63f] transition-colors"></span>
        </div>
      </button>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeTemplate={activeTemplate} 
        onSelect={setActiveTemplate}
      />

      {state === AppState.HOME && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center pt-32 px-8 pb-16">
          {/* Logo Section */}
          <div className="group relative mb-12">
             <div className="w-20 h-20 border-[4px] border-[#8cc63f] flex flex-col items-center justify-center text-[11px] text-[#8cc63f] font-black tracking-tighter transition-all group-hover:rotate-12 group-hover:scale-110">
                <div>ONE</div>
                <div>CUP</div>
             </div>
             <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#f68b1f] rounded-full"></div>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight font-serif-sc">答案之书</h1>
            <p className="text-gray-400 text-[10px] mt-2 font-black tracking-[0.4em] uppercase opacity-60">The Book of Answers</p>
          </div>
          
          <div className="w-full space-y-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8cc63f]/20 to-[#f68b1f]/20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="闭上双眼，在心中冥想你的问题..."
                  className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 h-48 focus:ring-0 focus:border-[#8cc63f]/30 outline-none transition-all resize-none shadow-sm placeholder:text-gray-300 text-[15px] leading-relaxed font-medium"
                />
                <button
                  onClick={() => handleAsk()}
                  disabled={!question.trim()}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-[#8cc63f] text-white rounded-2xl shadow-[0_10px_30px_rgba(140,198,63,0.3)] flex items-center justify-center active:scale-90 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 px-1">
                <span className="text-[10px] text-gray-300 font-black tracking-[0.3em] uppercase">启发灵感</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {RECOMMENDATIONS.map((rec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(rec.query)}
                    className="bg-white/70 hover:bg-white hover:shadow-md border border-gray-50 py-5 px-6 rounded-2xl text-[13px] text-gray-600 font-semibold transition-all text-left flex items-center justify-between group"
                  >
                    <span>{rec.label}</span>
                    <span className="text-[#8cc63f] translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-bold animate-pulse">
                {error}
              </div>
            )}
          </div>

          <footer className="mt-24 text-[10px] text-gray-300 tracking-[0.5em] font-black uppercase flex flex-col items-center">
            <div className="w-8 h-[2px] bg-gray-200 mb-4"></div>
            ONE CUP WISDOM
          </footer>
        </div>
      )}

      {state === AppState.LOADING && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-10 space-y-12">
          <div className="relative">
             <div className="w-24 h-24 border-[2px] border-[#8cc63f]/10 rounded-full"></div>
             <div className="absolute inset-0 w-24 h-24 border-[4px] border-[#8cc63f] rounded-full border-t-transparent animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#f68b1f] rounded-full animate-ping"></div>
             </div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-gray-800 font-black text-2xl tracking-tight font-serif-sc">正在解析心流...</h3>
            <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-black opacity-50">Resonating with your inner state</p>
          </div>
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#8cc63f]/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
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
