import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { useJobs } from '../context/JobContext';
import { exportJobToPDF } from '../utils/pdfExport';
import { CheckCircle2, Search, Edit3, FileDown, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const CompletedJobs = () => {
  const navigate = useNavigate();
  const { jobs, loadJob, deleteJob, resetJob, addToast } = useJobs();
  const [search, setSearch] = useState('');

  const completedJobs = jobs.filter(
    (j) => j.status === 'completed' &&
    (j.name.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEdit = (id) => {
    loadJob(id);
    navigate(`/jobs/${id}/edit`);
  };

  const handleNewJob = () => {
    resetJob();
    navigate('/jobs/new');
  };

  const handleDownloadPDF = (job, e) => {
    e.stopPropagation();
    exportJobToPDF(job);
    addToast(`Exported PDF report for ${job.id}`, 'success');
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
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Completed Job Sheets
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Archived production runs and cutting programs ready for manufacturing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={handleNewJob} icon={Plus}>
              + Create Job Sheet
            </Button>
          </div>
        </div>

        {/* Search Bar & Summary Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#172235] p-4 rounded-xl border border-slate-700/70">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Job ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D1525] text-xs sm:text-sm text-slate-200 rounded-lg pl-10 pr-3 py-2 border border-slate-700/80 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-auto">
            Showing <span className="font-bold text-white">{completedJobs.length}</span> completed jobs
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-[#172235] border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#111C30] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">JOB ID</th>
                  <th className="py-3.5 px-4">JOB NAME</th>
                  <th className="py-3.5 px-4">COMPLETED DATE</th>
                  <th className="py-3.5 px-4">DIMENSIONS</th>
                  <th className="py-3.5 px-4">PARTS</th>
                  <th className="py-3.5 px-4">YIELD</th>
                  <th className="py-3.5 px-4">WASTE</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {completedJobs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-500">
                      No completed jobs found matching your search.
                    </td>
                  </tr>
                ) : (
                  completedJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-[#111C30]/50 transition-colors group cursor-pointer"
                      onClick={() => handleEdit(job.id)}
                    >
                      <td className="py-4 px-4 font-mono font-bold text-blue-400">
                        {job.id}
                      </td>
                      <td className="py-4 px-4 font-semibold text-white">
                        {job.name}
                      </td>
                      <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(job.updatedAt || job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-300">
                        {job.sheet?.width || 1200} × {job.sheet?.height || 800} mm
                      </td>
                      <td className="py-4 px-4 text-slate-200 font-medium">
                        {job.analytics?.totalFitted || (job.parts ? job.parts.reduce((a, c) => a + (c.count || 0), 0) : 0)} Pcs
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-emerald-400">
                          {job.analytics?.yield || 92.4}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-amber-400">
                          {job.analytics?.waste || 7.6}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleDownloadPDF(job, e)}
                            title="Export PDF Report"
                            className="p-1.5 rounded-lg bg-[#0D1525] hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-700 transition-colors"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(job.id)}
                            title="View / Edit Job"
                            className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            title="Delete Job"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
