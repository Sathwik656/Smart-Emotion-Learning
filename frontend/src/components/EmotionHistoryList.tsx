import React from 'react';
import { useSessionStore } from '../store/useSessionStore';
import { Clock } from 'lucide-react';

export const EmotionHistoryList: React.FC = React.memo(() => {
  const { emotionHistory } = useSessionStore();

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy': return 'text-emerald-400';
      case 'sad': return 'text-blue-400';
      case 'angry': return 'text-red-400';
      case 'confused': return 'text-amber-400';
      case 'surprised': return 'text-violet-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="glass-card p-5 rounded-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-slate-300">
        <Clock size={18} />
        <h3 className="font-medium">Recent Emotions</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {emotionHistory.length === 0 ? (
          <p className="text-slate-500 text-sm italic text-center mt-4">Waiting for first detection...</p>
        ) : (
          // Reverse to show newest at top
          [...emotionHistory].reverse().map((entry, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
              <span className={`capitalize font-medium text-sm ${getEmotionColor(entry.emotion)}`}>
                {entry.emotion}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{(entry.confidence * 100).toFixed(0)}%</span>
                <span className="text-slate-500">
                  {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

EmotionHistoryList.displayName = 'EmotionHistoryList';
