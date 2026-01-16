
import React from 'react';

export interface Recommendation {
  label: string;
  query: string;
}

interface Props {
  question: string;
  setQuestion: (val: string) => void;
  onAsk: (query?: string) => void;
  recommendations: Recommendation[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const HomeView: React.FC<Props> = ({ 
  question, 
  setQuestion, 
  onAsk, 
  recommendations,
  isRefreshing,
  onRefresh
}) => {
  return (
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
            onClick={() => onAsk()}
            disabled={!question.trim()}
            className="absolute bottom-4 right-4 w-12 h-12 bg-[#8cc63f] text-white rounded-xl shadow-lg flex items-center justify-center active:scale-90 disabled:opacity-30 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-[9px] text-gray-300 font-black tracking-widest uppercase">启发灵感</span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>
            <button 
              onClick={onRefresh}
              disabled={isRefreshing}
              className="ml-4 flex items-center space-x-1 group active:scale-95 transition-all disabled:opacity-50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3 w-3 text-gray-300 group-hover:text-[#8cc63f] transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-[9px] text-gray-300 font-bold tracking-widest group-hover:text-[#8cc63f] transition-colors">换一换</span>
            </button>
          </div>
          
          <div className={`grid grid-cols-1 gap-2 transition-all duration-500 ${isRefreshing ? 'opacity-40 blur-[2px]' : 'opacity-100 blur-0'}`}>
            {recommendations.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => onAsk(rec.query)}
                className="bg-white/70 active:bg-white border border-gray-50 py-4 px-5 rounded-xl text-[12px] text-gray-600 font-semibold transition-all text-left flex items-center justify-between hover:shadow-md hover:border-[#8cc63f]/10"
              >
                <span className="truncate pr-4">{rec.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#8cc63f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  );
};
