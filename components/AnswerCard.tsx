
import React from 'react';
import { AnswerData, TemplateId } from '../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
  templateId: TemplateId;
}

const AnswerCard: React.FC<Props> = ({ data, onReset, templateId }) => {
  // 1. ZEN STYLE (OPTIMIZED FOR ONE SCREEN)
  if (templateId === 'zen') {
    return (
      <div className="max-w-md w-full bg-[#f9f6f1] h-screen flex flex-col p-6 mx-auto animate-in fade-in duration-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-stone-200"></div>

        <div className="flex justify-between items-start mt-6 relative z-10">
          <div className="flex flex-col">
            <h1 className="text-4xl text-stone-800 font-serif-sc font-black leading-none mb-3 writing-mode-vertical">
              {data.title}
            </h1>
            <div className="w-0.5 h-8 bg-stone-800 mt-2"></div>
          </div>
          
          <div className="flex flex-col items-end">
            <p className="text-stone-400 text-[9px] tracking-[0.4em] uppercase [writing-mode:vertical-rl] font-light py-2 border-r border-stone-200">
              {data.subtitle}
            </p>
            <div className="mt-4 w-8 h-8 border border-red-800 flex items-center justify-center text-red-800 font-serif-sc text-[8px] font-black leading-none p-1">
              答案<br/>一格
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8 relative z-10 flex-grow">
          {data.comparison.slice(0, 3).map((row, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-stone-300 text-[7px] mb-2 tracking-[0.5em] uppercase font-bold">{row.dimension}</span>
              <div className="flex items-center justify-center w-full px-4">
                <div className="text-stone-600 text-xs font-serif-sc tracking-widest text-right w-[42%]">{row.optionA}</div>
                <div className="mx-3 w-1 h-1 rounded-full bg-stone-300"></div>
                <div className="text-stone-400 text-xs font-serif-sc tracking-widest text-left w-[42%] italic">{row.optionB}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pb-6 flex flex-col items-center relative z-10">
          <div className="max-w-[220px] text-center mb-8">
            <p className="text-stone-700 text-base leading-relaxed font-serif-sc italic mb-3">
              {data.conclusion}
            </p>
            <p className="text-stone-400 text-[8px] uppercase tracking-[0.3em] opacity-60">
              {data.conclusionEn}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="text-stone-300 hover:text-stone-800 text-[9px] tracking-[0.5em] uppercase transition-colors border-b border-stone-200 pb-0.5"
          >
            Return to Void
          </button>
        </div>
      </div>
    );
  }

  // 2. COSMIC STYLE (COMPACT)
  if (templateId === 'cosmic') {
    return (
      <div className="max-w-md w-full bg-[#0b0c10] h-screen flex flex-col items-center p-6 mx-auto animate-in zoom-in-95 duration-500 text-white overflow-hidden relative">
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
  }

  // 3. BAUHAUS (COMPACT)
  if (templateId === 'bauhaus') {
    return (
      <div className="max-w-md w-full bg-white h-screen flex flex-col p-0 mx-auto border-x border-black overflow-hidden">
        <div className="bg-[#e74c3c] p-6 border-b-2 border-black">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-black text-white px-2 py-0.5 font-black text-[10px]">MODERN</div>
            <div className="text-white font-black text-2xl tracking-tighter italic">04</div>
          </div>
          <h1 className="text-white text-4xl font-black tracking-tighter mb-1 leading-none">
            {data.title}
          </h1>
          <p className="text-black font-bold text-[10px] tracking-widest uppercase bg-yellow-400 inline-block px-1.5 py-0.5">
            {data.subtitle}
          </p>
        </div>

        <div className="flex border-b-2 border-black">
          <div className="w-1/2 p-4 border-r-2 border-black bg-blue-500 text-white">
            <div className="text-[8px] font-black uppercase tracking-widest mb-1 opacity-50">Category</div>
            <div className="text-sm font-black tracking-tight">{data.category}</div>
          </div>
          <div className="w-1/2 p-4 flex items-center justify-center bg-white">
             <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-yellow-400 rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="p-5 flex-grow overflow-y-auto space-y-6">
          <div className="border-l-4 border-black pl-3 py-1">
            <h2 className="text-lg font-black tracking-tight leading-tight">{data.subheading}</h2>
          </div>
          <div className="space-y-2">
            {data.comparison.map((row, idx) => (
              <div key={idx} className="flex border border-black text-[10px]">
                <div className="bg-black text-white px-1.5 py-1 font-black uppercase flex items-center [writing-mode:vertical-lr] scale-75 origin-left">
                  {row.dimension}
                </div>
                <div className="flex-1 grid grid-cols-2 divide-x border-black">
                  <div className="p-2 font-bold leading-tight">{row.optionA}</div>
                  <div className="p-2 font-bold leading-tight bg-gray-50">{row.optionB}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t-2 border-black bg-yellow-400">
          <p className="text-black text-base font-black leading-tight mb-4">
            {data.conclusion}
          </p>
          <button 
            onClick={onReset}
            className="w-full bg-black text-white py-3 font-black text-[10px] tracking-[0.2em] uppercase"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  // 4. CLASSIC STYLE (OPTIMIZED ONE PAGE)
  return (
    <div className="max-w-md w-full bg-[#f3f5f8] h-screen flex flex-col items-center p-4 mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 overflow-hidden">
      <div className="w-full bg-[#8cc63f] rounded-[1.5rem] p-6 shadow-lg relative overflow-hidden shrink-0">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="mb-4 flex justify-between items-start">
            <div className="border border-white/90 w-10 h-10 flex flex-col items-center justify-center text-[8px] text-white font-black leading-none">
                <div>ONE</div>
                <div>CUP</div>
            </div>
            <div className="text-[8px] text-white/60 font-bold tracking-widest uppercase">Vol. 25</div>
        </div>
        <h1 className="text-white text-3xl font-black mb-1 font-serif-sc tracking-tight">
          {data.title}
        </h1>
        <p className="text-white/90 text-[10px] mb-4 font-bold tracking-widest uppercase">
          {data.subtitle}
        </p>
        <div className="text-white/70 text-[8px] font-black border-t border-white/20 pt-3 uppercase tracking-widest">
          {data.category} • Life Guidance
        </div>
      </div>

      <div className="w-full mt-6 flex-grow overflow-y-auto px-1 pb-4">
        <div className="w-full bg-white rounded-[1.2rem] p-4 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 text-center pb-4 border-b border-gray-50 mb-2">
            <div className="text-[#8cc63f] font-black text-[9px] uppercase">{data.tableHeaderA}</div>
            <div className="text-gray-300 font-black text-[8px] uppercase">DIM</div>
            <div className="text-[#f68b1f] font-black text-[9px] uppercase">{data.tableHeaderB}</div>
          </div>
          <div className="divide-y divide-gray-50">
            {data.comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 text-center py-3 items-center">
                <div className="text-[#8cc63f] text-[11px] font-medium px-1">{row.optionA}</div>
                <div className="text-gray-400 text-[8px] font-black uppercase opacity-40">{row.dimension}</div>
                <div className="text-[#f68b1f] text-[11px] font-medium px-1">{row.optionB}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center px-4 relative">
          <p className="text-[#2c3e50] text-base font-bold leading-relaxed font-serif-sc relative z-10">
            {data.conclusion}
          </p>
          <p className="text-gray-400 text-[8px] mt-3 uppercase tracking-widest opacity-60 font-bold">
            {data.conclusionEn}
          </p>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="mt-2 mb-4 bg-[#2c3e50] text-white px-8 py-3 rounded-full text-[9px] font-black tracking-[0.3em] uppercase shadow-lg shrink-0"
      >
        RE-ENTER
      </button>
    </div>
  );
};

export default AnswerCard;
