import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { Edit3, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';

export const RecentJobs = () => {
  const navigate = useNavigate();
  const { jobs, loadJob } = useJobs();

  // Display top 6 recent jobs
  const recentJobs = jobs.slice(0, 6);

  const handleEdit = (id) => {
    loadJob(id);
    navigate(`/jobs/${id}/edit`);
  };

  return (
    <div className="bg-[#172235] border border-slate-700/60 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold tracking-wide uppercase text-slate-200">
            RECENT JOB SHEETS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active and archived manufacturing nesting sheets
          </p>
        </div>
        <button
          onClick={() => navigate('/jobs/completed')}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 px-3">JOB ID</th>
              <th className="pb-3 px-3">JOB NAME</th>
              <th className="pb-3 px-3">DIMENSIONS</th>
              <th className="pb-3 px-3">PARTS</th>
              <th className="pb-3 px-3">STATUS</th>
              <th className="pb-3 px-3">YIELD</th>
              <th className="pb-3 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {recentJobs.map((job) => {
              const isCompleted = job.status === 'completed';
              return (
                <tr
                  key={job.id}
                  className="hover:bg-[#111C30]/60 transition-colors group"
                >
                  {/* Job ID */}
                  <td className="py-3.5 px-3 font-mono font-bold text-blue-400">
                    {job.id}
                  </td>

                  {/* Job Name */}
                  <td className="py-3.5 px-3 font-semibold text-slate-100 max-w-[220px] truncate">
                    {job.name}
                  </td>

                  {/* Dimensions */}
                  <td className="py-3.5 px-3 text-slate-300 font-mono">
                    {job.sheet?.width || 1200} × {job.sheet?.height || 800} mm
                  </td>

                  {/* Parts */}
                  <td className="py-3.5 px-3 text-slate-300 font-medium">
                    {job.analytics?.totalFitted || (job.parts ? job.parts.reduce((a, c) => a + (c.count || 0), 0) : 0)} Parts
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        isCompleted
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-950/40 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {isCompleted ? 'Completed' : 'Draft'}
                    </span>
                  </td>

                  {/* Yield */}
                  <td className="py-3.5 px-3">
                    {isCompleted && job.analytics?.yield ? (
                      <span className="font-semibold text-emerald-400">
                        {job.analytics.yield}%
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono">--</span>
                    )}
                  </td>

                  {/* Edit Action Button */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleEdit(job.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111C30] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-500/40 font-semibold text-xs transition-all cursor-pointer group-hover:border-slate-600"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>EDIT</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
