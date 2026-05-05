import React from 'react';
import { useSessionStore } from '../store/useSessionStore';
import { Lightbulb, ArrowRight, PlayCircle, FileText, CheckCircle2 } from 'lucide-react';

export const AdaptiveSuggestions: React.FC = () => {
  const { adaptiveContents, currentAction, currentEmotion } = useSessionStore();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={16} />;
      case 'quiz': return <CheckCircle2 size={16} />;
      default: return <FileText size={16} />;
    }
  };

  if (!adaptiveContents || adaptiveContents.length <= 1) {
    return null;
  }

  // Skip the first content as it's the primary one shown in ContentPlayer
  const suggestions = adaptiveContents.slice(1, 4);

  return (
    <div className="glass-card p-5 rounded-xl border-t-2" style={{ borderTopColor: 'var(--color-primary)' }}>
      <div className="flex items-center gap-2 mb-3 text-blue-400">
        <Lightbulb size={20} className={currentAction ? "animate-pulse" : ""} />
        <h3 className="font-semibold text-white">Adaptive Action</h3>
      </div>
      
      {currentAction && (
        <div className="mb-5 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
          <p className="text-sm text-blue-200">
            Because you appear <span className="font-bold capitalize">{currentEmotion}</span>, 
            we are taking action: <span className="font-bold capitalize text-white">{currentAction}</span>
          </p>
        </div>
      )}

      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Up Next</h4>
      
      <div className="space-y-3">
        {suggestions.map((content) => (
          <div key={content._id} className="group flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-slate-900/50 rounded-md text-slate-400 group-hover:text-blue-400 transition-colors">
                {getTypeIcon(content.type)}
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-slate-200 truncate">{content.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 capitalize border border-slate-700">
                    {content.difficulty}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{content.type}</span>
                </div>
              </div>
            </div>
            <ArrowRight size={16} className="text-slate-600 group-hover:text-white transform group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
