
import React from 'react';

export const LoadingView: React.FC = () => {
  return (
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
  );
};
