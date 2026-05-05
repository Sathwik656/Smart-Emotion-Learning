import React from 'react';
import { useSessionStore } from '../store/useSessionStore';

export const EmotionIndicator: React.FC = () => {
  const { currentEmotion, confidence } = useSessionStore();

  const getEmotionDetails = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy': return { emoji: '😊', color: 'bg-emerald-500', text: 'text-emerald-400' };
      case 'sad': return { emoji: '😢', color: 'bg-blue-500', text: 'text-blue-400' };
      case 'angry': return { emoji: '😠', color: 'bg-red-500', text: 'text-red-400' };
      case 'confused': return { emoji: '😕', color: 'bg-amber-500', text: 'text-amber-400' };
      case 'surprised': return { emoji: '😲', color: 'bg-violet-500', text: 'text-violet-400' };
      default: return { emoji: '😐', color: 'bg-slate-400', text: 'text-slate-300' };
    }
  };

  const details = getEmotionDetails(currentEmotion);

  return (
    <div className="glass-card p-5 rounded-xl border-t-2" style={{ borderTopColor: 'var(--color-surface)' }}>
      <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Current State</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${details.color} bg-opacity-20 border border-current shadow-lg transition-all duration-500 ${details.text}`}>
          {details.emoji}
        </div>
        <div>
          <p className={`text-2xl font-bold capitalize ${details.text} transition-colors duration-300`}>
            {currentEmotion}
          </p>
          <p className="text-slate-400 text-sm mt-1">Detected Emotion</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Confidence</span>
          <span className="text-slate-200 font-medium">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${details.color} transition-all duration-700 ease-out`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
