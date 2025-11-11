
import React, { useState, useEffect, useRef } from 'react';
import type { UserSettings } from '../types';
import BlockedOverlay from '../components/BlockedOverlay';
import { YoutubeIcon, InstagramIcon } from '../components/icons';

interface SimulationScreenProps {
  settings: UserSettings;
  onBlock: (appName: 'YouTube' | 'Instagram', contentType: 'Shorts' | 'Reels') => void;
}

type SimulatedApp = 'YouTube' | 'Instagram';

const FeedPost: React.FC<{ user: string }> = ({ user }) => (
  <div className="bg-slate-600 rounded-lg p-3">
    <div className="flex items-center mb-2">
      <img src={`https://picsum.photos/seed/${user}/40/40`} alt="avatar" className="w-8 h-8 rounded-full" />
      <p className="ml-2 font-semibold text-sm">{user}</p>
    </div>
    <div className="bg-slate-500 h-40 rounded-md">
      <img src={`https://picsum.photos/seed/${user}post/400/300`} className="w-full h-full object-cover rounded-md" alt="post" />
    </div>
  </div>
);

const ShortsReelsSection: React.FC<{ type: 'Shorts' | 'Reels', isBlocked: boolean }> = ({ type, isBlocked }) => (
    <div className="relative bg-slate-600 rounded-lg p-3">
        <h3 className="font-bold text-lg mb-2">{type}</h3>
        <div className="grid grid-cols-2 gap-2">
            {[1, 2].map(i => (
                <div key={i} className="bg-slate-500 h-48 rounded-md" />
            ))}
        </div>
        {isBlocked && <BlockedOverlay contentType={type} />}
    </div>
);


const SimulationScreen: React.FC<SimulationScreenProps> = ({ settings, onBlock }) => {
  const [activeApp, setActiveApp] = useState<SimulatedApp>('YouTube');
  const onBlockRef = useRef(onBlock);
  onBlockRef.current = onBlock;

  useEffect(() => {
    if (activeApp === 'YouTube' && settings.block_youtube_shorts) {
      onBlockRef.current('YouTube', 'Shorts');
    }
  }, [activeApp, settings.block_youtube_shorts]);

  useEffect(() => {
    if (activeApp === 'Instagram' && settings.block_instagram_reels) {
      onBlockRef.current('Instagram', 'Reels');
    }
  }, [activeApp, settings.block_instagram_reels]);

  const TABS: { name: SimulatedApp, icon: React.ReactNode }[] = [
    { name: 'YouTube', icon: <YoutubeIcon /> },
    { name: 'Instagram', icon: <InstagramIcon /> }
  ];

  return (
    <div className="p-2 space-y-4 animate-fade-in">
       <header>
        <h1 className="text-3xl font-bold text-white">App Simulator</h1>
        <p className="text-slate-400">Experience FocusFlow in action.</p>
      </header>
      
      <div className="flex bg-slate-700 rounded-lg p-1">
        {TABS.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveApp(tab.name)}
            className={`flex-1 flex items-center justify-center p-2 rounded-md transition-colors text-sm font-medium ${
              activeApp === tab.name ? 'bg-brand-primary text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-800 p-3 rounded-lg space-y-4">
        {activeApp === 'YouTube' && (
          <>
            <FeedPost user="TechVision" />
            <ShortsReelsSection type="Shorts" isBlocked={settings.block_youtube_shorts} />
            <FeedPost user="GamerPro" />
          </>
        )}
        {activeApp === 'Instagram' && (
          <>
            <FeedPost user="Wanderlust" />
            <ShortsReelsSection type="Reels" isBlocked={settings.block_instagram_reels} />
            <FeedPost user="FoodieFinds" />
          </>
        )}
      </div>
    </div>
  );
};

export default SimulationScreen;
