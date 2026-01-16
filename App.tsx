
import React from 'react';
import { AppState } from './types';
import { useAnswerBook } from './hooks/useAnswerBook';
import AnswerCard from './components/AnswerCard';
import Drawer from './components/Drawer';
import { HomeView } from './components/HomeView';
import { LoadingView } from './components/LoadingView';

const RECOMMENDATIONS = [
  { label: '今日运势', query: '我今天的整体运势如何？给出一些生活的指引。' },
  { label: '职业迷茫', query: '面对职业发展的十字路口，我该坚持现状还是寻找突破？' },
  { label: '内在宁静', query: '最近思绪纷乱，请给我一些关于如何保持内心平静的智慧。' },
];

const App: React.FC = () => {
  const {
    state,
    question,
    setQuestion,
    answer,
    activeTemplate,
    setActiveTemplate,
    isDrawerOpen,
    setIsDrawerOpen,
    handleAsk,
    handleReset
  } = useAnswerBook();

  return (
    <div className="h-screen bg-[#f3f5f8] font-sans text-gray-900 selection:bg-[#8cc63f]/20 overflow-hidden flex flex-col">
      {/* 顶部菜单按钮 */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 left-6 z-30 p-3 bg-white rounded-full shadow-md border border-gray-100 active:scale-95"
      >
        <div className="w-4 h-4 flex flex-col justify-between items-start">
          <span className="w-full h-[2px] bg-gray-400"></span>
          <span className="w-3/4 h-[2px] bg-gray-400"></span>
          <span className="w-full h-[2px] bg-gray-400"></span>
        </div>
      </button>

      {/* 风格切换抽屉 */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeTemplate={activeTemplate} 
        onSelect={setActiveTemplate}
      />

      {/* 视图分发 */}
      {state === AppState.HOME && (
        <HomeView 
          question={question} 
          setQuestion={setQuestion} 
          onAsk={handleAsk} 
          recommendations={RECOMMENDATIONS} 
        />
      )}

      {state === AppState.LOADING && <LoadingView />}

      {state === AppState.RESULT && answer && (
        <AnswerCard 
          data={answer} 
          onReset={handleReset} 
          templateId={activeTemplate} 
        />
      )}
    </div>
  );
};

export default App;
