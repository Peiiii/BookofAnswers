
import React from 'react';
import { AnswerData } from '../../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
}

export const BauhausTemplate: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-md w-full bg-white h-screen flex flex-col p-0 mx-auto border-x border-black overflow-hidden font-sans">
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
};
