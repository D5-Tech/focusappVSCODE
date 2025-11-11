
import React, { useMemo } from 'react';
import type { AppStats } from '../types';
import StatsCard from '../components/StatsCard';
import { BanIcon, ClockIcon } from '../components/icons';

// Recharts is loaded from CDN, so we declare it here to satisfy TypeScript
declare const Recharts: any;

interface StatsScreenProps {
  stats: AppStats;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ stats }) => {
  // Move destructuring inside the component to ensure Recharts global is loaded when component renders.
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

  const chartData = useMemo(() => {
    return Object.entries(stats.daily_summary)
      .map(([date, count]) => ({
        name: new Date(date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' }),
        blocks: count,
      }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
      .slice(-7); // Show last 7 days
  }, [stats.daily_summary]);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-white">Your Stats</h1>
        <p className="text-slate-400">See the progress you've made.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <StatsCard 
          title="Total Blocks" 
          value={stats.total_blocks.toString()}
          icon={<BanIcon />} 
        />
        <StatsCard 
          title="Time Saved (est.)" 
          value={`${stats.time_saved_minutes.toFixed(0)} min`} 
          icon={<ClockIcon />}
        />
      </div>

      <div className="bg-slate-700 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Daily Activity</h2>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} fontSize={12} />
                <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }}
                  cursor={{ fill: '#4f46e5', fillOpacity: 0.2 }}
                />
                <Bar dataKey="blocks" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-slate-400">
            <p>No blocking activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsScreen;
