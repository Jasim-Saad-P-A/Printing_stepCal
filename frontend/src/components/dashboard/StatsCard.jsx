import React from 'react';
import { Layers, FileEdit } from 'lucide-react';

export const StatsCard = ({ title, count, subtitle, icon: Icon = Layers, variant = 'blue' }) => {
  const styles = {
    blue: {
      border: 'border-blue-500/30',
      bg: 'bg-[#172235]',
      badge: 'bg-blue-600/10 text-blue-400 border-blue-500/20',
      number: 'text-white'
    },
    purple: {
      border: 'border-indigo-500/30',
      bg: 'bg-[#172235]',
      badge: 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20',
      number: 'text-white'
    }
  };

  const style = styles[variant] || styles.blue;

  return (
    <div className={`p-6 rounded-xl border ${style.border} ${style.bg} shadow-lg transition-all duration-200 flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-lg border ${style.badge}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-4">
        <div className={`text-4xl font-extrabold tracking-tight ${style.number}`}>
          {count}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
