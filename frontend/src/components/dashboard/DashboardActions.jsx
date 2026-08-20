import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { CheckCircle2, PlusCircle, FileText, ArrowRight } from 'lucide-react';

export const DashboardActions = () => {
  const navigate = useNavigate();
  const { resetJob } = useJobs();

  const handleCreate = () => {
    resetJob();
    navigate('/jobs/new');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Action 1: View Completed Jobs */}
      <div
        onClick={() => navigate('/jobs/completed')}
        className="group bg-[#172235] hover:bg-[#1C2B42] border border-slate-700/60 hover:border-slate-600 rounded-xl p-6 transition-all duration-200 cursor-pointer shadow-lg flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">
            VIEW COMPLETED JOBS
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Browse full production runs, historical yield logs, and export PDF print files.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mt-6 group-hover:translate-x-1 transition-transform">
          <span>Open Completed Archive</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Action 2: CREATE JOB SHEET (Primary / Highlighted) */}
      <div
        onClick={handleCreate}
        className="group relative bg-gradient-to-b from-[#1C2B42] to-[#172235] border-2 border-indigo-500/50 hover:border-indigo-400 rounded-xl p-6 transition-all duration-200 cursor-pointer shadow-xl shadow-indigo-950/40 flex flex-col justify-between ring-1 ring-indigo-500/20"
      >
        <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow">
          Primary Action
        </div>
        <div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md shadow-indigo-600/30">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">
            CREATE JOB SHEET
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Configure sheet dimensions, import CAD/SVG vector contours, and run nesting optimization.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mt-6 group-hover:translate-x-1 transition-transform">
          <span>Launch StepCalculator Engine</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Action 3: Draft Jobs */}
      <div
        onClick={() => navigate('/jobs/drafts')}
        className="group bg-[#172235] hover:bg-[#1C2B42] border border-slate-700/60 hover:border-slate-600 rounded-xl p-6 transition-all duration-200 cursor-pointer shadow-lg flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-lg bg-amber-950/50 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">
            DRAFT JOBS
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Resume pending job setups, refine part margins, and test layout variations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mt-6 group-hover:translate-x-1 transition-transform">
          <span>Continue Draft Setups</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
