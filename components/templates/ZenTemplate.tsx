
import React from 'react';
import { AnswerData } from '../../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
}

export const ZenTemplate: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-md w-full bg-[#F9F6F1] h-screen flex flex-col p-10 mx-auto relative overflow-hidden font-serif-sc select-none ink-bleed">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-stone-200/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex justify-between items-start mb-16">
        <div className="flex flex-col">
          <span className="text-[10px] text-stone-400 tracking-[0.8em] uppercase mb-1">{data.category}</span>
          <div className="w-8 h-[1px] bg-stone-300"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-red-700/60 flex items-center justify-center p-1 rotate-2">
            <span className="text-red-800 text-[10px] font-black leading-none text-center">
              壹<br/>格
            </span>
          </div>
          <span className="text-[7px] text-red-800/40 font-sans font-bold mt-1 tracking-tighter">WISDOM</span>
        </div>
      </div>

      <div className="flex flex-row-reverse flex-1 items-start justify-between relative z-10">
        <div className="flex flex-col items-center ml-4">
          <h1 className="text-5xl text-stone-800 font-bold leading-[1.2] [writing-mode:vertical-rl] tracking-[0.2em] py-2">
            {data.title}
          </h1>
          <div className="flex flex-col items-center mt-6 space-y-2 opacity-30">
             <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
             <div className="w-[1px] h-12 bg-stone-800"></div>
          </div>
        </div>

        <div className="flex-1 pr-8 flex flex-col justify-start space-y-12 mt-4">
          {data.comparison.slice(0, 3).map((row, idx) => (
            <div key={idx} className="group flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                 <span className="text-[8px] text-stone-300 font-sans font-black tracking-widest uppercase">0{idx + 1}</span>
                 <span className="text-[9px] text-stone-400 tracking-[0.3em]">{row.dimension}</span>
              </div>
              <div className="space-y-2 pl-4 border-l border-stone-200/50 group-hover:border-stone-400 transition-colors">
                <div className="text-stone-700 text-[13px] tracking-widest leading-relaxed">
                  {row.optionA}
                </div>
                <div className="text-stone-400 text-[11px] italic tracking-wide font-light">
                  {row.optionB}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-12 pb-2 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <span className="absolute -top-8 -left-4 text-stone-200 text-6xl font-serif opacity-50">“</span>
            <p className="text-stone-600 text-[17px] leading-loose max-w-[280px] font-serif-sc px-4">
              {data.conclusion}
            </p>
            <span className="absolute -bottom-10 -right-4 text-stone-200 text-6xl font-serif opacity-50 rotate-180">“</span>
          </div>
          <div className="text-[8px] text-stone-300 uppercase tracking-[0.5em] mb-10 opacity-60">
            {data.conclusionEn}
          </div>
          <button onClick={onReset} className="group relative flex flex-col items-center">
            <div className="text-[9px] text-stone-400 tracking-[0.8em] uppercase mb-3 group-hover:text-stone-600 transition-colors">
              归于寂静
            </div>
            <div className="relative w-16 h-[1px] bg-stone-200 overflow-hidden">
              <div className="absolute inset-0 bg-stone-800 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
