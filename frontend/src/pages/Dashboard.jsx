import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { StatsCard } from '../components/dashboard/StatsCard';
import { DashboardActions } from '../components/dashboard/DashboardActions';
import { RecentJobs } from '../components/dashboard/RecentJobs';
import { useJobs } from '../context/JobContext';
import { Layers, FileEdit, CheckCircle2, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { totalJobsCount, draftJobsCount, completedJobsCount } = useJobs();

  return (
    <PageContainer>
      <div className="flex flex-col gap-8 pb-10">
        {/* Top Greeting Header */}
        <DashboardHeader />

        {/* Primary Statistics Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Job Sheets */}
          <StatsCard
            title="TOTAL JOB SHEETS"
            count={totalJobsCount || 24}
            subtitle="Manufacturing job runs configured"
            icon={Layers}
            variant="blue"
          />

          {/* Card 2: Draft Job Sheets */}
          <StatsCard
            title="DRAFT JOB SHEETS"
            count={draftJobsCount || 6}
            subtitle="Pending nesting parameter reviews"
            icon={FileEdit}
            variant="purple"
          />

          {/* Card 3: Completed Jobs */}
          <StatsCard
            title="COMPLETED JOBS"
            count={completedJobsCount || 18}
            subtitle="Ready or dispatched to laser/CNC cutter"
            icon={CheckCircle2}
            variant="blue"
          />

          {/* Card 4: Average Material Yield */}
          <StatsCard
            title="AVG YIELD EFFICIENCY"
            count="92.1%"
            subtitle="+4.8% material saved vs manual"
            icon={TrendingUp}
            variant="purple"
          />
        </div>

        {/* Recent Job Sheets Section */}
        <RecentJobs />

        {/* Action Cards Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            QUICK ACTIONS & NAVIGATION
          </h2>
          <DashboardActions />
        </div>
      </div>
    </PageContainer>
  );
};
