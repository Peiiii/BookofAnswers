
import React from 'react';
import { AnswerData } from '../../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
}

export const CosmicTemplate: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-md w-full bg-[#0b0c10] h-screen flex flex-col items-center p-6 mx-auto animate-in zoom-in-95 duration-500 text-white overflow-hidden relative font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_10%,_rgba(34,211,238,0.15),transparent_60%)] pointer-events-none"></div>
      
      <div className="relative mt-8 mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-500 mb-2 font-serif-sc">
          {data.title}
        </h1>
        <p className="text-cyan-400/80 text-[9px] tracking-[0.4em] uppercase font-bold">
          {data.subtitle}
        </p>
      </div>

      <div className="w-full bg-white/5 backdrop-blur-md rounded-[1.5rem] p-5 border border-white/10 mb-8 shadow-xl flex-grow overflow-y-auto">
         <div className="text-[8px] text-cyan-500/60 font-bold tracking-[0.2em] uppercase mb-4 text-center">{data.subheading}</div>
         <div className="space-y-2">
           {data.comparison.map((row, idx) => (
             <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-none">
               <div className="w-[42%] text-right text-[11px] font-medium text-white/90 leading-tight">{row.optionA}</div>
               <div className="w-[16%] text-center text-[7px] text-white/20 uppercase font-black">{row.dimension}</div>
               <div className="w-[42%] text-left text-[11px] font-medium text-cyan-400 leading-tight">{row.optionB}</div>
             </div>
           ))}
         </div>
      </div>

      <div className="text-center px-4 mb-8">
        <p className="text-white/90 text-sm font-light leading-relaxed font-serif-sc">
          {data.conclusion}
        </p>
        <p className="text-white/30 text-[8px] mt-2 uppercase tracking-[0.1em]">{data.conclusionEn}</p>
      </div>

      <button 
        onClick={onReset}
        className="mb-6 px-8 py-3 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-[9px] tracking-widest font-bold text-cyan-400 uppercase"
      >
        RE-ENTER FLOW
      </button>
    </div>
  );
};
