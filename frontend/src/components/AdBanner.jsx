import React from 'react';
import { TrendingUp } from 'lucide-react';

export const AdBanner = ({ size = 'leaderboard', className = '' }) => {
  const configs = {
    leaderboard: { w: '100%', h: '90px', label: '728×90 — Leaderboard Ad' },
    rectangle:   { w: '100%', h: '250px', label: '300×250 — Medium Rectangle' },
    banner:      { w: '100%', h: '60px', label: '320×50 — Mobile Banner' },
  };
  const c = configs[size] || configs.leaderboard;

  return (
    <div
      className={`ad-zone ${className}`}
      style={{ width: c.w, minHeight: c.h }}
      aria-label="Advertisement"
    >
      {/* Replace with real AdSense code */}
      <div className="flex flex-col items-center justify-center gap-1 py-4 w-full">
        <TrendingUp size={22} className="text-indigo-400 opacity-60" />
        <span className="text-xs text-gray-500 font-medium">{c.label}</span>
        <span className="text-[10px] text-gray-600 mt-0.5">
          Place your Google AdSense / ad code here
        </span>
      </div>
    </div>
  );
};
