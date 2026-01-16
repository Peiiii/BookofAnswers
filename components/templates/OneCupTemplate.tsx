
import React from 'react';
import { AnswerData } from '../../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
}

export const OneCupTemplate: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-md w-full bg-[#f3f5f8] h-screen flex flex-col items-center p-4 mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 overflow-hidden font-sans">
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
