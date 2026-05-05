import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WebcamFeed } from '../components/WebcamFeed';
import { EmotionIndicator } from '../components/EmotionIndicator';
import { EmotionHistoryList } from '../components/EmotionHistoryList';
import { ContentPlayer } from '../components/ContentPlayer';
import { AdaptiveSuggestions } from '../components/AdaptiveSuggestions';
import { useSessionStore } from '../store/useSessionStore';
import { contentService } from '../services/endpoints';
import { ArrowLeft } from 'lucide-react';

export const LearnSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resetSession } = useSessionStore();

  useEffect(() => {
    // Initial fetch to ensure the content exists
    const fetchInitialContent = async () => {
      try {
        if (id) {
          await contentService.getById(id);
          // Assuming successful, but real adaptive contents will come from Emotion API
        }
      } catch (error) {
        console.error("Failed to fetch initial content", error);
      }
    };

    fetchInitialContent();

    return () => {
      // Cleanup session on unmount
      resetSession();
    };
  }, [id, resetSession]);

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        
        {/* Left Column: Content Area (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex-1 min-h-[500px]">
            <ContentPlayer />
          </div>
          
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none">
            <WebcamFeed />
          </div>
        </div>

        {/* Right Column: Emotion & Analytics Area (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-6 order-1 lg:order-2">
          <EmotionIndicator />
          <AdaptiveSuggestions />
          <div className="flex-1 min-h-[300px] max-h-[400px]">
            <EmotionHistoryList />
          </div>
        </div>

      </div>
    </div>
  );
};
