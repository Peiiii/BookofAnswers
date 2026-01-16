
import React from 'react';
import { AnswerData } from '../types';

interface Props {
  data: AnswerData;
  onReset: () => void;
}

const AnswerCard: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-md w-full bg-[#f3f5f8] min-h-screen flex flex-col items-center p-6 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Green Card */}
      <div className="w-full bg-[#8cc63f] rounded-[2.5rem] p-8 shadow-lg relative overflow-hidden">
        {/* Simple Logo Placeholder */}
        <div className="mb-8">
            <div className="border-2 border-white w-10 h-10 flex flex-col items-center justify-center text-[8px] text-white font-bold leading-tight">
                <div>ONE</div>
                <div>CUP</div>
                <div className="w-4 h-[1px] bg-white mt-0.5"></div>
            </div>
        </div>

        <h1 className="text-white text-3xl font-bold mb-2 leading-tight">
          {data.title}
        </h1>
        <p className="text-white/80 text-xs mb-8 opacity-90 font-medium">
          {data.subtitle}
        </p>

        <div className="text-white/70 text-xs font-medium border-t border-white/20 pt-4">
          领域 | {data.category}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="w-full mt-10 px-2">
        <div className="text-center mb-6">
          <h2 className="text-[#333] text-lg font-bold">{data.subheading}</h2>
          <p className="text-[#999] text-[10px] uppercase tracking-wider mt-1">{data.subheadingEn}</p>
        </div>

        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-3 text-center py-3">
            <div className="text-[#8cc63f] font-bold text-sm">{data.tableHeaderA}</div>
            <div className="text-[#666] font-bold text-sm">维度</div>
            <div className="text-[#f68b1f] font-bold text-sm">{data.tableHeaderB}</div>
          </div>

          {/* Table Rows */}
          {data.comparison.map((row, idx) => (
            <div key={idx} className="grid grid-cols-3 text-center py-3 border-b border-[#e5e7eb] last:border-none">
              <div className="text-[#8cc63f] text-[11px] px-1 flex items-center justify-center leading-tight">
                {row.optionA}
              </div>
              <div className="text-[#333] text-[11px] font-medium bg-white/50 py-1 rounded-sm flex items-center justify-center">
                {row.dimension}
              </div>
              <div className="text-[#f68b1f] text-[11px] px-1 flex items-center justify-center leading-tight">
                {row.optionB}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion Footer */}
      <div className="mt-12 text-center px-4">
        <p className="text-[#333] text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
          {data.conclusion}
        </p>
        <p className="text-[#999] text-[9px] mt-2 leading-tight uppercase max-w-[240px] mx-auto opacity-70">
          {data.conclusionEn}
        </p>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onReset}
        className="mt-12 mb-8 bg-white border border-gray-200 text-gray-500 px-6 py-2 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm"
      >
        重新提问
      </button>
    </div>
  );
};

export default AnswerCard;
