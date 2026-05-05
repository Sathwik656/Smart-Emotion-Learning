import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/endpoints';
import type { ChartData } from '../services/endpoints';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  BarChart, Bar, Legend 
} from 'recharts';
import { Loader2, Users, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#64748b'];

export const Admin: React.FC = () => {
  const [distribution, setDistribution] = useState<ChartData[]>([]);
  const [trends, setTrends] = useState<ChartData[]>([]);
  const [topUsers, setTopUsers] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [distRes, trendsRes, usersRes] = await Promise.all([
          analyticsService.getDistribution(),
          analyticsService.getTrends(),
          analyticsService.getTopUsers()
        ]);

        if (distRes.data.success) setDistribution(distRes.data.data);
        if (trendsRes.data.success) {
          const formattedTrends = formatTrendsData(trendsRes.data.data);
          setTrends(formattedTrends);
        }
        if (usersRes.data.success) setTopUsers(usersRes.data.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const formatTrendsData = (rawData: any[]) => {
    const map = new Map();
    rawData.forEach(item => {
      if (!item._id || !item._id.date) return;
      const date = item._id.date;
      const emotion = item._id.emotion;
      const count = item.count;
      
      if (!map.has(date)) {
        map.set(date, { date });
      }
      map.get(date)[emotion] = count;
    });
    return Array.from(map.values()).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Loader2 className="animate-spin text-violet-500" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Platform Analytics</h1>
        <p className="text-slate-400">Overview of student emotional states and engagement</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Emotion Distribution */}
        <div className="glass-card p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-6 text-slate-200">
            <PieChartIcon size={20} className="text-violet-400" />
            <h2 className="text-xl font-semibold">Emotion Distribution</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="emotion"
                  label={({ name, percent }) => `${name || 'Unknown'} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {distribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Engaged Users */}
        <div className="glass-card p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-6 text-slate-200">
            <Users size={20} className="text-blue-400" />
            <h2 className="text-xl font-semibold">Top Engaged Users</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topUsers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="_id" type="category" width={100} stroke="#94a3b8" tickFormatter={(val) => val.substring(0, 8) + '...'} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Bar dataKey="interactions" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotion Trends Over Time */}
        <div className="glass-card p-6 rounded-2xl border border-slate-700/50 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-slate-200">
            <TrendingUp size={20} className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Emotion Trends Over Time</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="happy" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="sad" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="confused" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="angry" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="surprised" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="neutral" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
