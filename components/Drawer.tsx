
import React from 'react';
import { TEMPLATES, TemplateId } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const Drawer: React.FC<Props> = ({ isOpen, onClose, activeTemplate, onSelect }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out p-6 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-gray-800">选择风格</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onSelect(t.id);
                onClose();
              }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center space-x-3 group ${
                activeTemplate === t.id 
                ? 'border-[#8cc63f] bg-[#8cc63f]/5' 
                : 'border-gray-50 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div 
                className="w-10 h-10 rounded-full flex-shrink-0 shadow-inner"
                style={{ backgroundColor: t.previewColor }}
              />
              <div>
                <div className={`text-sm font-bold ${activeTemplate === t.id ? 'text-[#8cc63f]' : 'text-gray-700'}`}>
                  {t.name}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">{t.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-10 left-6 right-6 text-center">
          <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">More Styles Coming</p>
        </div>
      </div>
    </>
  );
};

export default Drawer;
