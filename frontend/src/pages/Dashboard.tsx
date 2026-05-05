import React, { useEffect, useState } from 'react';
import { contentService } from '../services/endpoints';
import type { Content } from '../services/endpoints';
import { DashboardCard } from '../components/DashboardCard';
import { Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentService.getAll();
        if (response.data.success) {
          setContents(response.data.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Learning Dashboard</h1>
        <p className="text-slate-400">Pick up where you left off or explore new adaptive content.</p>
      </div>

      {contents.length === 0 ? (
        <div className="text-center p-12 glass-panel rounded-2xl">
          <p className="text-slate-400 text-lg">No content available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contents.map((content) => (
            <DashboardCard key={content._id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
};
