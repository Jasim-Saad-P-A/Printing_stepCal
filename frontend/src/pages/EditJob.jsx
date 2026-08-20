import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { JobSetup } from '../components/setup/JobSetup';
import { NestingCanvas } from '../components/canvas/NestingCanvas';
import { YieldAnalytics } from '../components/analytics/YieldAnalytics';
import { useJobs } from '../context/JobContext';
import { Loader2 } from 'lucide-react';

export const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadJob, currentJob } = useJobs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (id) {
        setLoading(true);
        await loadJob(id);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, loadJob]);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Loading Job Sheet {id}...</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-[1720px]">
      <div className="flex flex-col gap-4">
        {/* Job ID indicator ribbon */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-400">
              {currentJob.id || id}
            </span>
            <span className="text-xs text-slate-400">
              Last modified: {new Date(currentJob.updatedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <span
            className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${
              currentJob.status === 'completed'
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-950/40 text-amber-400 border-amber-500/20'
            }`}
          >
            {currentJob.status === 'completed' ? 'Completed Job' : 'Draft Setup'}
          </span>
        </div>

        {/* 3-Column Industrial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[calc(100vh-140px)]">
          {/* Column 1: Job & Sheet Setup */}
          <div className="lg:col-span-3 flex flex-col">
            <JobSetup />
          </div>

          {/* Column 2: Interactive Canvas Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <NestingCanvas />
          </div>

          {/* Column 3: Yield Analytics */}
          <div className="lg:col-span-3 flex flex-col">
            <YieldAnalytics />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
