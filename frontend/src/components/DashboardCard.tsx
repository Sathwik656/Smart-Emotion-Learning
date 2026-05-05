import React from 'react';
import type { Content } from '../services/endpoints';
import { PlayCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  content: Content;
}

export const DashboardCard: React.FC<DashboardCardProps> = React.memo(({ content }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={18} className="text-blue-400" />;
      case 'quiz': return <CheckCircle2 size={18} className="text-violet-400" />;
      default: return <FileText size={18} className="text-slate-400" />;
    }
  };

  return (
    <Link to={`/learn/${content._id}`} className="block h-full cursor-pointer">
      <div className="glass-card rounded-xl p-5 h-full flex flex-col group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-800/50 rounded-lg group-hover:scale-110 transition-transform">
            {getTypeIcon(content.type)}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyColor(content.difficulty)}`}>
            {content.difficulty.charAt(0).toUpperCase() + content.difficulty.slice(1)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2">{content.title}</h3>
        <p className="text-slate-400 text-sm flex-1 line-clamp-3">{content.description}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center text-sm text-slate-400">
          <span className="capitalize">{content.type}</span>
          {content.duration && (
            <>
              <span className="mx-2">•</span>
              <span>{content.duration} min</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
});

DashboardCard.displayName = 'DashboardCard';
