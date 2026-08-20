import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { useJobs } from '../context/JobContext';
import { FileText, Clock, Search, Edit3, Trash2, ArrowRight, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const DraftJobs = () => {
  const navigate = useNavigate();
  const { jobs, loadJob, deleteJob, resetJob } = useJobs();
  const [search, setSearch] = useState('');

  const draftJobs = jobs.filter(
    (j) => j.status === 'draft' &&
    (j.name.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleContinueEditing = (id) => {
    loadJob(id);
    navigate(`/jobs/${id}/edit`);
  };

  const handleNewJob = () => {
    resetJob();
    navigate('/jobs/new');
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 pb-10">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg bg-[#172235] hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Draft Job Sheets
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Work-in-progress nesting layouts awaiting parameter review or final simulation
              </p>
            </div>
          </div>

          <Button variant="primary" size="sm" onClick={handleNewJob} icon={Plus}>
            + Create Job Sheet
          </Button>
        </div>

        {/* Search Bar & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#172235] p-4 rounded-xl border border-slate-700/70">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search draft job sheets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D1525] text-xs sm:text-sm text-slate-200 rounded-lg pl-10 pr-3 py-2 border border-slate-700/80 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-auto">
            Showing <span className="font-bold text-white">{draftJobs.length}</span> drafts
          </div>
        </div>

        {/* Draft Cards Grid */}
        {draftJobs.length === 0 ? (
          <div className="bg-[#172235] border border-slate-700/60 rounded-xl p-12 text-center text-slate-500 text-sm">
            No draft job sheets found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {draftJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#172235] hover:bg-[#1A273D] border border-slate-700/70 hover:border-amber-500/40 rounded-xl p-5 shadow-lg flex flex-col justify-between gap-5 transition-all group"
              >
                <div>
                  {/* Top Bar with ID and Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {job.id}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950/40 text-amber-400 border border-amber-500/20">
                      <Clock className="w-3 h-3" />
                      Draft
                    </span>
                  </div>

                  {/* Job Name */}
                  <h3 className="text-base font-bold text-white mt-3 truncate group-hover:text-blue-300 transition-colors">
                    {job.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1.5 mt-3 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Dimensions:</span>
                      <span className="font-mono text-slate-200 font-medium">
                        {job.sheet?.width || 1200} × {job.sheet?.height || 800} mm
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Configured Parts:</span>
                      <span className="text-slate-200 font-medium">
                        {job.parts?.length || job.files?.length || 0} Assets
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Modified:</span>
                      <span className="font-mono text-[11px]">
                        {new Date(job.updatedAt || job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleContinueEditing(job.id)}
                    className="gradient-btn-primary text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continue Editing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
