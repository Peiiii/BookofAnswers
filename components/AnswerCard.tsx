
import React from 'react';
import { AnswerData, TemplateId } from '../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
  templateId: TemplateId;
}

const AnswerCard: React.FC<Props> = ({ data, onReset, templateId }) => {
  // 1. ZEN STYLE
  if (templateId === 'zen') {
    return (
      <div className="max-w-md w-full bg-[#fcf9f4] min-h-screen flex flex-col items-center p-8 mx-auto animate-in fade-in duration-1000">
        <div className="w-full flex justify-center mb-16 mt-10">
          <div className="w-12 h-[1px] bg-stone-300"></div>
          <div className="mx-4 text-stone-400 text-[10px] tracking-[0.4em] uppercase">Meditation</div>
          <div className="w-12 h-[1px] bg-stone-300"></div>
        </div>

        <h1 className="text-4xl text-stone-700 font-serif-sc italic mb-2 tracking-tight text-center">
          {data.title}
        </h1>
        <p className="text-stone-400 text-[10px] mb-20 tracking-widest text-center uppercase">
          {data.subtitle}
        </p>

        <div className="w-full space-y-12 mb-16">
          {data.comparison.slice(0, 3).map((row, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-stone-300 text-[9px] mb-2 tracking-widest uppercase">{row.dimension}</span>
              <div className="flex items-center space-x-6">
                <span className="text-stone-500 font-medium text-sm">{row.optionA}</span>
                <span className="w-4 h-[1px] bg-stone-200"></span>
                <span className="text-stone-400 text-sm">{row.optionB}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto mb-10 text-center">
          <div className="text-stone-600 text-base leading-loose max-w-[240px] mx-auto font-serif-sc tracking-wide">
            {data.conclusion}
          </div>
          <p className="text-stone-400 text-[9px] mt-4 tracking-widest opacity-60 uppercase italic">
            {data.conclusionEn}
          </p>
        </div>

        <button 
          onClick={onReset}
          className="bg-stone-100 text-stone-400 px-8 py-2 rounded-sm text-[10px] tracking-widest uppercase hover:bg-stone-200 transition-colors mb-10"
        >
          Another Path
        </button>
      </div>
    );
  }

  // 2. COSMIC STYLE
  if (templateId === 'cosmic') {
    return (
      <div className="max-w-md w-full bg-[#0b0c10] min-h-screen flex flex-col items-center p-10 mx-auto animate-in zoom-in-95 duration-700 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_rgba(34,211,238,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-10 mb-20"></div>
        
        <div className="relative mb-12 text-center">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150"></div>
          <h1 className="relative text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-500 mb-4 font-serif-sc">
            {data.title}
          </h1>
          <p className="relative text-cyan-400/80 text-[10px] tracking-[0.5em] uppercase font-bold">
            {data.subtitle}
          </p>
        </div>

        <div className="w-full bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 mb-20 shadow-2xl">
           <div className="text-[10px] text-cyan-500/60 font-bold tracking-[0.3em] uppercase mb-8 text-center">{data.subheading}</div>
           <div className="space-y-6">
             {data.comparison.map((row, idx) => (
               <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 last:border-none">
                 <div className="w-[42%] text-right text-xs font-medium text-white/90 leading-tight">{row.optionA}</div>
                 <div className="w-[16%] text-center text-[8px] text-white/20 uppercase tracking-tighter font-black">{row.dimension}</div>
                 <div className="w-[42%] text-left text-xs font-medium text-cyan-400 leading-tight">{row.optionB}</div>
               </div>
             ))}
           </div>
        </div>

        <div className="text-center px-4 mb-16 relative">
          <p className="text-white/90 text-lg font-light leading-relaxed font-serif-sc">
            {data.conclusion}
          </p>
          <p className="text-white/30 text-[9px] mt-4 uppercase tracking-[0.2em] font-medium">{data.conclusionEn}</p>
        </div>

        <button 
          onClick={onReset}
          className="mt-auto mb-10 px-10 py-4 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-[10px] tracking-widest font-bold text-cyan-400 shadow-lg hover:bg-cyan-600/40 transition-all active:scale-95 uppercase"
        >
          Return to Stars
        </button>
      </div>
    );
  }

  // 3. BAUHAUS (MODERNIST) STYLE
  if (templateId === 'bauhaus') {
    return (
      <div className="max-w-md w-full bg-white min-h-screen flex flex-col p-0 mx-auto animate-in slide-in-from-right-10 duration-500 border-x border-black">
        {/* Header Block */}
        <div className="bg-[#e74c3c] p-8 border-b-4 border-black">
          <div className="flex justify-between items-start mb-12">
            <div className="bg-black text-white p-2 font-black text-xs leading-none">MODERN</div>
            <div className="text-white font-black text-4xl tracking-tighter">04</div>
          </div>
          <h1 className="text-white text-6xl font-black tracking-tighter mb-2 leading-none">
            {data.title}
          </h1>
          <p className="text-black font-bold text-xs tracking-widest uppercase bg-yellow-400 inline-block px-2 py-1">
            {data.subtitle}
          </p>
        </div>

        {/* Info Grid */}
        <div className="flex border-b-4 border-black">
          <div className="w-1/2 p-6 border-r-4 border-black flex flex-col justify-center bg-blue-500 text-white">
            <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Category</div>
            <div className="text-xl font-black tracking-tight leading-none">{data.category}</div>
          </div>
          <div className="w-1/2 p-6 flex items-center justify-center bg-white">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          <div className="border-l-8 border-black pl-4 py-2">
            <h2 className="text-2xl font-black tracking-tight">{data.subheading}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{data.subheadingEn}</p>
          </div>

          <div className="space-y-4">
            {data.comparison.map((row, idx) => (
              <div key={idx} className="flex border-2 border-black">
                <div className="bg-black text-white px-2 py-1 text-[8px] font-black uppercase flex items-center transform -rotate-180 [writing-mode:vertical-lr]">
                  {row.dimension}
                </div>
                <div className="flex-1 grid grid-cols-2 divide-x-2 divide-black">
                  <div className="p-3 text-xs font-bold leading-tight flex items-center">{row.optionA}</div>
                  <div className="p-3 text-xs font-bold leading-tight flex items-center bg-gray-50">{row.optionB}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Conclusion */}
        <div className="mt-auto p-8 border-t-4 border-black bg-yellow-400">
          <p className="text-black text-xl font-black leading-tight mb-4">
            {data.conclusion}
          </p>
          <p className="text-black/40 text-[9px] font-black uppercase tracking-widest">
            {data.conclusionEn}
          </p>
          <button 
            onClick={onReset}
            className="mt-8 w-full bg-black text-white py-4 font-black text-xs tracking-[0.3em] uppercase hover:bg-red-500 transition-colors"
          >
            Reset System
          </button>
        </div>
      </div>
    );
  }

  // 4. CLASSIC ONE CUP STYLE (DEFAULT)
  return (
    <div className="max-w-md w-full bg-[#f3f5f8] min-h-screen flex flex-col items-center p-6 mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Brand Header Card */}
      <div className="w-full bg-[#8cc63f] rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(140,198,63,0.25)] relative overflow-hidden group">
        {/* Subtle decorative circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
        
        <div className="mb-10 flex justify-between items-start">
            <div className="border-2 border-white/90 w-12 h-12 flex flex-col items-center justify-center text-[10px] text-white font-black leading-none">
                <div className="mt-0.5">ONE</div>
                <div className="mb-0.5">CUP</div>
                <div className="w-5 h-[2px] bg-white"></div>
            </div>
            <div className="text-[10px] text-white/60 font-bold tracking-[0.2em] uppercase pt-2">
              Vol. {new Date().getFullYear()}
            </div>
        </div>

        <h1 className="text-white text-5xl font-black mb-3 leading-[1.1] font-serif-sc tracking-tight">
          {data.title}
        </h1>
        <p className="text-white/90 text-[11px] mb-10 font-bold tracking-[0.2em] uppercase">
          {data.subtitle}
        </p>

        <div className="flex items-center space-x-3 text-white/70 text-[10px] font-black border-t border-white/20 pt-6 uppercase tracking-widest">
          <span>{data.category}</span>
          <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
          <span>Life Guidance</span>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="w-full mt-12 px-2">
        <div className="text-center mb-10">
          <h2 className="text-[#2c3e50] text-xl font-black font-serif-sc">{data.subheading}</h2>
          <p className="text-[#999] text-[9px] uppercase tracking-[0.3em] font-black mt-2 opacity-60">{data.subheadingEn}</p>
        </div>

        <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 text-center pb-6 border-b border-gray-50">
            <div className="text-[#8cc63f] font-black text-[11px] uppercase tracking-widest">{data.tableHeaderA}</div>
            <div className="text-gray-300 font-black text-[9px] uppercase tracking-widest flex items-center justify-center">DIM</div>
            <div className="text-[#f68b1f] font-black text-[11px] uppercase tracking-widest">{data.tableHeaderB}</div>
          </div>

          <div className="divide-y divide-gray-50">
            {data.comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 text-center py-5 items-center">
                <div className="text-[#8cc63f] text-xs font-medium px-2 leading-tight">
                  {row.optionA}
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-1 h-1 bg-gray-200 rounded-full mb-1"></div>
                   <div className="text-gray-400 text-[9px] font-black uppercase tracking-tighter opacity-50">
                    {row.dimension}
                   </div>
                </div>
                <div className="text-[#f68b1f] text-xs font-medium px-2 leading-tight">
                  {row.optionB}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="mt-16 text-center px-6 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-100 text-7xl font-black pointer-events-none opacity-50">“</div>
        <p className="text-[#2c3e50] text-lg font-bold leading-[1.8] max-w-[320px] mx-auto font-serif-sc relative z-10">
          {data.conclusion}
        </p>
        <p className="text-gray-400 text-[10px] mt-6 leading-relaxed uppercase max-w-[280px] mx-auto opacity-50 font-bold tracking-wider">
          {data.conclusionEn}
        </p>
      </div>

      <button 
        onClick={onReset}
        className="mt-16 mb-12 bg-[#2c3e50] text-white px-10 py-4 rounded-full text-[10px] font-black tracking-[0.4em] uppercase hover:bg-black transition-all shadow-xl active:scale-95"
      >
        RE-ENTER FLOW
      </button>
    </div>
  );
};

export default AnswerCard;
