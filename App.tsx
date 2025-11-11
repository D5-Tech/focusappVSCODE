import React, { useState, useMemo, useCallback } from 'react';
import type { UserSettings, BlockEvent, AppStats } from './types';
import { View } from './types';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import SimulationScreen from './screens/SimulationScreen';
import AIScreen from './screens/AIScreen';
import BottomNav from './components/BottomNav';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [settings, setSettings] = useLocalStorage<UserSettings>('user_settings', {
    block_youtube_shorts: true,
    block_instagram_reels: true,
  });
  const [blockEvents, setBlockEvents] = useLocalStorage<BlockEvent[]>('block_events', []);

  const handleToggle = (key: keyof UserSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const logBlockEvent = useCallback((appName: 'YouTube' | 'Instagram', contentType: 'Shorts' | 'Reels') => {
    const newEvent: BlockEvent = {
      event_id: Date.now(),
      app_name: appName,
      content_type: contentType,
      timestamp: Date.now(),
    };
    setBlockEvents(prev => [...prev, newEvent]);
  }, [setBlockEvents]);

  const stats: AppStats = useMemo(() => {
    const total_blocks = blockEvents.length;
    const time_saved_minutes = total_blocks * 1.5; // Estimate 1.5 minutes saved per block

    const dailySummary = blockEvents.reduce((acc, event) => {
      const date = new Date(event.timestamp).toLocaleDateString('en-CA'); // YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return { total_blocks, time_saved_minutes, daily_summary: dailySummary };
  }, [blockEvents]);

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <HomeScreen settings={settings} onToggle={handleToggle} />;
      case View.Stats:
        return <StatsScreen stats={stats} />;
      case View.Simulation:
        return <SimulationScreen settings={settings} onBlock={logBlockEvent} />;
      case View.AI:
        return <AIScreen />;
      default:
        return <HomeScreen settings={settings} onToggle={handleToggle} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-sm h-[85vh] max-h-[800px] bg-slate-800 rounded-3xl shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 bg-slate-700 h-6 rounded-b-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
        </div>
        <main className="flex-grow overflow-y-auto p-4 pt-10 scrollbar-hide">
          {renderView()}
        </main>
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;
