import React from 'react';
import { clsx } from 'clsx';

export const AnalyticsCard = ({
  title,
  value,
  subtitle,
  variant = 'default',
  highlight = false,
  className = ''
}) => {
  const isYield = variant === 'yield' || highlight;
  const isWaste = variant === 'waste';

  return (
    <div
      className={clsx(
        'p-4 rounded-xl transition-all duration-200 flex flex-col justify-between',
        isYield && 'bg-[#102422]/70 border border-emerald-500/50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/20',
        isWaste && 'bg-[#0D1525] border border-slate-700/80',
        !isYield && !isWaste && 'bg-[#0D1525] border border-slate-700/80',
        className
      )}
    >
      <span
        className={clsx(
          'text-[10px] sm:text-[11px] font-bold tracking-wider uppercase',
          isYield ? 'text-emerald-400' : 'text-slate-400'
        )}
      >
        {title}
      </span>

      <div className="my-1.5 flex items-baseline justify-between">
        <span
          className={clsx(
            'text-2xl sm:text-3xl font-extrabold tracking-tight',
            isYield ? 'text-[#34D399]' : 'text-white'
          )}
        >
          {value}
        </span>
        {subtitle && (
          <span
            className={clsx(
              'text-[11px] font-medium',
              isYield ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
