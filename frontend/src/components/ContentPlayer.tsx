import React from 'react';
import { useSessionStore } from '../store/useSessionStore';
import { PlayCircle, CheckCircle2, FileText, Zap } from 'lucide-react';

export const ContentPlayer: React.FC = () => {
  const { adaptiveContents, currentDifficulty } = useSessionStore();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="text-blue-400" size={24} />;
      case 'quiz': return <CheckCircle2 className="text-violet-400" size={24} />;
      default: return <FileText className="text-slate-400" size={24} />;
    }
  };

  // If no specific adaptive content yet, show placeholder
  if (!adaptiveContents || adaptiveContents.length === 0) {
    return (
      <div className="w-full h-full min-h-[400px] glass-panel rounded-2xl flex flex-col items-center justify-center border border-dashed border-slate-700">
        <Zap className="text-slate-600 mb-4 animate-pulse" size={48} />
        <h2 className="text-xl font-medium text-slate-300">Waiting for Adaptive Content</h2>
        <p className="text-slate-500 mt-2">Make sure your camera is on. Content will adjust based on your emotion.</p>
      </div>
    );
  }

  const primaryContent = adaptiveContents[0];

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Main Content Area */}
      <div className="w-full aspect-video bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Top bar indicating adaptive state */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-slate-900/80 to-transparent">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getDifficultyColor(currentDifficulty || primaryContent.difficulty)}`}>
            {currentDifficulty ? currentDifficulty.toUpperCase() : primaryContent.difficulty.toUpperCase()} MODE
          </span>
          <div className="p-2 bg-slate-800/80 backdrop-blur-md rounded-lg">
            {getTypeIcon(primaryContent.type)}
          </div>
        </div>

        {/* Content Placeholder (In a real app, this would be an iframe/video player/quiz component) */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{primaryContent.title}</h1>
          <p className="text-slate-300 max-w-2xl text-lg">{primaryContent.description}</p>
          
          <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors flex items-center gap-2">
            <PlayCircle size={20} />
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};
