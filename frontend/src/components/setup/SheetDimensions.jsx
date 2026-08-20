import React from 'react';
import { useJobs } from '../../context/JobContext';

export const SheetDimensions = () => {
  const { currentJob, updateSheetDimensions } = useJobs();
  const width = currentJob.sheet?.width ?? 1200;
  const height = currentJob.sheet?.height ?? 800;

  const handleWidthChange = (e) => {
    const val = parseInt(e.target.value, 10);
    updateSheetDimensions(isNaN(val) ? '' : val, height);
  };

  const handleHeightChange = (e) => {
    const val = parseInt(e.target.value, 10);
    updateSheetDimensions(width, isNaN(val) ? '' : val);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
        SHEET DIMENSIONS (MM)
      </label>
      <div className="grid grid-cols-2 gap-3">
        {/* Width Field */}
        <div className="flex items-center bg-[#0D1525] border border-slate-700/80 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <span className="text-xs font-semibold text-slate-400 mr-2 select-none">W:</span>
          <input
            type="number"
            min="100"
            max="10000"
            value={width}
            onChange={handleWidthChange}
            placeholder="1200"
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
          />
        </div>

        {/* Height Field */}
        <div className="flex items-center bg-[#0D1525] border border-slate-700/80 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <span className="text-xs font-semibold text-slate-400 mr-2 select-none">H:</span>
          <input
            type="number"
            min="100"
            max="10000"
            value={height}
            onChange={handleHeightChange}
            placeholder="800"
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
