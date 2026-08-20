import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { Modal } from '../common/Modal';
import { Search, Edit3, Trash2, ArrowRight, CheckCircle2, Clock, FileSpreadsheet } from 'lucide-react';

export const SavedJobsModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { jobs, loadJob, deleteJob } = useJobs();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch =
      job.name.toLowerCase().includes(search.toLowerCase()) ||
      job.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEdit = (id) => {
    loadJob(id);
    onClose();
    navigate(`/jobs/${id}/edit`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Saved Job Sheets" maxWidth="max-w-2xl">
      <div className="flex flex-col gap-4">
        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center bg-[#0D1525] p-1 rounded-lg border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'completed' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed ({jobs.filter(j => j.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === 'draft' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Drafts ({jobs.filter(j => j.status === 'draft').length})
            </button>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D1525] text-xs text-slate-200 rounded-lg pl-9 pr-3 py-2 border border-slate-700/70 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Jobs List */}
        <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No matching job sheets found.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#111C30] hover:bg-[#16243D] p-3.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${job.status === 'completed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'}`}>
                    {job.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-400">{job.id}</span>
                      <span className="text-sm font-semibold text-white truncate">{job.name}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                      <span>{job.sheet?.width || 1200} × {job.sheet?.height || 800} mm</span>
                      <span>•</span>
                      <span>{job.analytics?.totalFitted || 0} Parts</span>
                      {job.analytics?.yield && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">{job.analytics.yield}% Yield</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(job.id)}
                    className="p-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="Edit Job"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Job"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
