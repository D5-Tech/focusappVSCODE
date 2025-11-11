
import React from 'react';
import { EyeSlashIcon } from './icons';

interface BlockedOverlayProps {
  contentType: 'Shorts' | 'Reels';
}

const BlockedOverlay: React.FC<BlockedOverlayProps> = ({ contentType }) => {
  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 rounded-lg z-10">
      <div className="w-16 h-16 bg-brand-primary/20 flex items-center justify-center rounded-full mb-4">
        <EyeSlashIcon className="text-brand-primary" />
      </div>
      <h3 className="text-xl font-bold text-white">FocusFlow Activated</h3>
      <p className="text-slate-300 mt-2">
        {contentType} blocked to help you stay on track. Great job!
      </p>
    </div>
  );
};

export default BlockedOverlay;
