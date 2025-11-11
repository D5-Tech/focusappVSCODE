
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: () => void;
  icon: React.ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onChange, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg shadow-md">
      <div className="flex items-center">
        {icon}
        <span className="ml-4 text-lg font-medium text-slate-200">{label}</span>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-primary ${
          enabled ? 'bg-brand-primary' : 'bg-slate-600'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
