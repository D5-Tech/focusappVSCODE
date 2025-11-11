
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-lg flex items-center">
      <div className="p-3 bg-brand-primary/20 rounded-full text-brand-primary">{icon}</div>
      <div className="ml-4">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
