
import React from 'react';
import { View } from '../types';
import { HomeIcon, ChartBarIcon, DevicePhoneMobileIcon, SparklesIcon } from './icons';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 p-2 transition-all duration-300 rounded-lg ${
      isActive ? 'text-brand-primary scale-110' : 'text-slate-400 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="flex items-center justify-around bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 p-1">
      <NavItem
        icon={<HomeIcon />}
        label="Home"
        isActive={currentView === View.Home}
        onClick={() => setCurrentView(View.Home)}
      />
      <NavItem
        icon={<ChartBarIcon />}
        label="Stats"
        isActive={currentView === View.Stats}
        onClick={() => setCurrentView(View.Stats)}
      />
      <NavItem
        icon={<DevicePhoneMobileIcon />}
        label="Sim"
        isActive={currentView === View.Simulation}
        onClick={() => setCurrentView(View.Simulation)}
      />
      <NavItem
        icon={<SparklesIcon />}
        label="AI"
        isActive={currentView === View.AI}
        onClick={() => setCurrentView(View.AI)}
      />
    </nav>
  );
};

export default BottomNav;
