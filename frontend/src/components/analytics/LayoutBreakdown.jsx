import React from 'react';
import { useJobs } from '../../context/JobContext';

export const LayoutBreakdown = () => {
  const { currentJob } = useJobs();
  const breakdown = currentJob.breakdown?.length
    ? currentJob.breakdown
    : [
        { name: 'Polygon_A.svg', count: 48, color: '#6366F1' },
        { name: 'Packaging_Box.dxf', count: 24, color: '#10B981' },
        { name: 'Circle_Seal.svg', count: 70, color: '#EC4899' }
      ];

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
        LAYOUT BREAKDOWN
      </label>

      <div className="space-y-2">
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#0D1525] border border-slate-700/60 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color || '#3B82F6' }}
              />
              <span className="font-medium text-slate-200 truncate">
                {item.name}
              </span>
            </div>
            <span className="font-mono font-semibold text-slate-300 ml-2">
              {item.count} pcs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
