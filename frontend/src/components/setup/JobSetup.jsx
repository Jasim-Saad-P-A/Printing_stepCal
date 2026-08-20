import React from 'react';
import { useJobs } from '../../context/JobContext';
import { SheetDimensions } from './SheetDimensions';
import { FileUploader } from './FileUploader';
import { ConstraintsPanel } from './ConstraintsPanel';
import { Play, Loader2 } from 'lucide-react';

export const JobSetup = () => {
  const { currentJob, updateJobName, runNesting, isNesting } = useJobs();

  return (
    <div className="bg-[#172235] border border-slate-700/70 rounded-xl p-5 shadow-xl flex flex-col justify-between gap-5 h-full">
      <div className="flex flex-col gap-4">
        {/* Section Header */}
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>1. JOB & SHEET SETUP</span>
          </h2>
        </div>

        {/* Job Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            JOB NAME
          </label>
          <input
            type="text"
            value={currentJob.name || ''}
            onChange={(e) => updateJobName(e.target.value)}
            placeholder="Production Batch 01"
            className="w-full bg-[#0D1525] text-white text-sm font-semibold rounded-lg border border-slate-700/80 px-3.5 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Sheet Dimensions */}
        <SheetDimensions />

        {/* Import Polygons */}
        <FileUploader />

        {/* Constraints & Margins */}
        <ConstraintsPanel />
      </div>

      {/* Large Bottom Run Nesting Engine Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={runNesting}
          disabled={isNesting}
          className="w-full gradient-btn-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          {isNesting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>RUNNING NESTING...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>RUN NESTING ENGINE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
