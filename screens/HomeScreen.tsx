
import React from 'react';
import type { UserSettings } from '../types';
import ToggleSwitch from '../components/ToggleSwitch';
import { YoutubeIcon, InstagramIcon } from '../components/icons';

interface HomeScreenProps {
  settings: UserSettings;
  onToggle: (key: keyof UserSettings) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ settings, onToggle }) => {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">FocusFlow</h1>
        <p className="text-slate-400 mt-2">Reclaim your focus, one block at a time.</p>
      </header>

      <div className="space-y-4">
        <ToggleSwitch
          label="Block YouTube Shorts"
          enabled={settings.block_youtube_shorts}
          onChange={() => onToggle('block_youtube_shorts')}
          icon={<YoutubeIcon />}
        />
        <ToggleSwitch
          label="Block Instagram Reels"
          enabled={settings.block_instagram_reels}
          onChange={() => onToggle('block_instagram_reels')}
          icon={<InstagramIcon />}
        />
      </div>

      <div className="text-center text-slate-500 text-sm p-4 bg-slate-800/50 rounded-lg mt-8">
        <p>Enable blockers and visit the 'Sim' tab to see FocusFlow in action.</p>
      </div>
    </div>
  );
};

export default HomeScreen;
